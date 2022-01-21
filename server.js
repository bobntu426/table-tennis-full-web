import mongoose from 'mongoose'
import dotenv from 'dotenv-defaults'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'
import { GraphQLServer, PubSub } from 'graphql-yoga'
import cors from 'cors'
import express from 'express'
import People from './models/people'
const pubsub = new PubSub()
const app = express()
app.use(cors())
dotenv.config()
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('mongo db connection created'))

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

const db = mongoose.connection

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: {
    Query,
    Mutation,
  },
  context: {
    db,
    pubsub,
  },
})

//const wss = new WebSocket.Server({ server })

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

//console.log(process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  console.log('MongoDB connected!')
  const PORT = process.env.port || 4000
  server.start({ port: PORT }, async() => {
    const people = await People.find()
    console.log(`The server is up on port ${PORT}!`)
    if(people.length == 0){
      await People.insertMany([
        {name:'張峻林',score:2000},
        {name:'張家翔',score:1900},
        {name:'張育杰',score:1800},
      ])
      console.log('init data')
    }
  })
})

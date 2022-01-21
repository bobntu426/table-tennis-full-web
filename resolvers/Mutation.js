import People from '../models/people'
import bcrypt from 'bcryptjs'
const Mutation = {
  async deleteAllData(parent, args, { db, pubsub }, info) {
    try{
      await People.deleteMany({})
    }catch{}
    return 'all data has been deleted'
  }
}
export default Mutation

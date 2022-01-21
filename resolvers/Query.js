import People from '../models/people'
const Query = {
  async getAllPeople(parent, args, { db }, info) {
    const people = await People.find()
    return people.map((person)=>person.name)
  }
}
export default Query


import mongoose from 'mongoose';

const Schema = mongoose.Schema;
// Creating a schema, sort of like working with an ORM
const peopleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name field is required.']
    },
    score: {
        type: Number,
        required: [true, 'number field is required.']
    }
    
});


const People = mongoose.model('people', peopleSchema);

export default People;
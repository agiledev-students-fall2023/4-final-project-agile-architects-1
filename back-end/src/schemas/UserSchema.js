import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
}, { collection: 'WasteWise.Test' });

// Create a model from the schema
const Test = mongoose.model('Test', testSchema);

export default Test;

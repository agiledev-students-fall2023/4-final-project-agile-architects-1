import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Define a schema for individual meals
const testSchema = new Schema({
mealId: { type: Schema.Types.ObjectId, required: true, default: () => new mongoose.Types.ObjectId() },
  date: {String}
}, { collection: 'WasteWise.Test' });

// Create a model from the schema
const Test = mongoose.model('Test', testSchema);

export default Test;

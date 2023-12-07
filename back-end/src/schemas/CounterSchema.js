import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CounterSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true, default: () => new mongoose.Types.ObjectId() },
    seq: { type: Number, default: 0 },
    postTitle: { type: String, required: true },
}, { collection: 'Counter' });

const Counter = mongoose.model('counter', CounterSchema);
export default Counter;

// PostSchema.pre('save', function (next) {
//     let doc = this;
//     Counter.findByIdAndUpdate({ _id: 'playerId' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counter) {
//         if (error)
//             return next(error);
//         doc.id = counter.seq;
//         next();
//     });
// });
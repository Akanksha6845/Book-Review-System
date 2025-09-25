const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Review", ReviewSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
}, { timestamps: true });

module.exports = mongoose.model("Book", BookSchema);

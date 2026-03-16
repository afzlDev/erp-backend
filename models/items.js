import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  sku: {
    type: String,
    unique: true
  },

  category: String,

  unitPrice: Number,

  description: String

}, { timestamps: true });

export default mongoose.model("Item", ItemSchema);
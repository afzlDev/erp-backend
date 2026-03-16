import mongoose from "mongoose";

const PurchaseOrderSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "Ordered",
    },
  },
  { timestamps: true }
);

export default mongoose.model("PurchaseOrder", PurchaseOrderSchema);
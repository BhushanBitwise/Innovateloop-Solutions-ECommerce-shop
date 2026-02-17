const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    orderItems: [
      {
        name: { type: String },
        qty: { type: Number },
        image: { type: String },
        price: { type: Number },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        }
      }
    ],
    shippingAddress: {
      address: String,
      city: String,
      postalCode: String,
      country: String
    },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "Processing" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

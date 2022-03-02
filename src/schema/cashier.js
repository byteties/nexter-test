import mongoose from "mongoose";

const SchemaModel = mongoose.Schema;

const cashierSchema = new SchemaModel({
  type: { type: Number },
  amount: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const cashierModel = mongoose.model("cashier", cashierSchema);

export default cashierModel;

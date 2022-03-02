import cashierModel from "../schema/cashier";
import { seedCashier } from "../constants";

const seed = async (req, res) => {
  try {
    await cashierModel.deleteMany({});
    await cashierModel.insertMany(seedCashier);
    return res.send({ msg: "Update successfully!!!" }).status(200);
  } catch (e) {
    return res.send("Server Error!!!").status(500);
  }
};

const calculate = async (req, res) => {
  try {
    const { body } = req;
    const { amount } = body;
    const cashier = await cashierModel.find({});
    if (!cashier) {
      return res.send({ msg: "seed cashier before start!!!" }).status(400);
    }
    const monetInCashier = cashier
      .map((item) => item.type * item.amount)
      .reduce((prev, curr) => prev + curr, 0);

    if (amount > monetInCashier) {
      return res.send({ msg: "Money in cashier not enough!!!" }).status(400);
    } else {
      const cashBack = [];
      let amountCal = amount;
      for (const value of cashier) {
        const cashType = value.type;
        let num = Math.floor(amountCal / cashType);
        if (num > value.amount) {
          cashBack.push({ type: cashType, amount: value.amount });
          amountCal -= cashType * value.amount;
        } else {
          cashBack.push({ type: cashType, amount: num });
          amountCal -= cashType * num;
        }
      }

      for await (const data of cashBack) {
        const { type, amount } = data;
        await cashierModel.updateOne(
          { type: type },
          { $inc: { amount: -amount } }
        );
      }
      amountCal = Number(amountCal.toFixed(2));
      return res.send({ scrap: amountCal, cashBack }).status(200);
    }
  } catch (e) {
    return res.send("Server Error!!!").status(500);
  }
};

export default {
  seed,
  calculate,
};

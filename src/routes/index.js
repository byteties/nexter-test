import express from "express";
import numberController from "../controller/number";
import cashierController from "../controller/cashier";
const route = express();

route.post("/cashiers/seed", cashierController.seed);

route.post("/cashiers/change", cashierController.calculate);
route.post("/number/calculate", numberController.calculate);

route.get("/healthz", (req, res) => {
  res.send("OK");
});

route.get("/", (req, res) => {
  res.status(200).send("hello world");
});

export default route;

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import route from "./routes";

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(route);
const port = 8080;

mongoose.connect("mongodb://mongodb:27017/nexter", {
  useNewUrlParser: true,
});
mongoose.connection.on("connected", () => {
  console.info("Mongoose connection has been connected.");

  app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
  });
});

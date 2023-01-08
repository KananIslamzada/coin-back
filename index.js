const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const upload = require("express-fileupload");
const cors = require("cors");
const coinsRouter = require('./routes/coins');
require("dotenv/config");



app.use(express.static(path.join(__dirname, "public")));
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(upload());
app.use("/public/uploads", express.static("public/uploads"));

app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  // );
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});



//routes
app.use("/coins", coinsRouter)

//

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to DB");
  })

mongoose.set("strictQuery", false);
const express = require("express");
const app = express();
const dotenv = require("dotenv");

const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const errorMiddlewares = require("./middlewares/errors");

dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(cors());

cloudinary.config({
  cloud_name: "dfbo1ecn9",
  api_key: "937221934331221",
  api_secret: "0PalAWB6WXyk7srvsbPxNosjvp0",
});

const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
const payment = require("./routes/payment");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(errorMiddlewares);
app.use(express.urlencoded({ extended: true }));

module.exports = app;

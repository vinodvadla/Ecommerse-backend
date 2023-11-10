const express = require("express");
const app = express();
const path = require("path");
const ecomRouter = require("../Routes/Ecomrouter");
const auth = require("./auth");
const cartRouter = require("../Routes/cartRouter");
const cookieParser = require("cookie-parser");
const productRouter = require("../Routes/ProductRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("Public")));
app.use(cookieParser());
app.use(auth);
app.set("view engine", "ejs");
app.use("/products", productRouter);
app.use("/", ecomRouter);
app.use("/", cartRouter);

module.exports = app;

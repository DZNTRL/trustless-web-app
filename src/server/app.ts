import createError from "http-errors"
import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"
import indexRouter from "./routes/index"
import { createPool } from "pro-web-core"
import config from "config"
import Core from "pro-web-core"

const swaggerDoc = require("../../documentation/v1/swagger.json")
const dbConfig = config.get("db")

console.log(path.join(__dirname, "/routes/*.js"))
var options = {
  explorer: true
};


var app = express();

// view engine setup
app.set("views", path.resolve(__dirname, "../../views"));
app.set("view engine", "pug");
app.set("pool", createPool(dbConfig))
app.set("userService", new Core.Service.User(app.get("pool")))
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDoc, options))
app.use("/", indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

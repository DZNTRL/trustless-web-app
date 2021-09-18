import createError from "http-errors"
import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"
import passport from "passport"
import swaggerUI from "swagger-ui-express"
import indexRouter from "./routes/index"
import { createPool } from "pro-web-core"
import config from "config"
import { setupJwtAuth, setupPKAuth } from "./utils"
import { IProWebCore } from "pro-web-core"

const swaggerDoc = require("../../documentation/v1/swagger.json")
const dbConfig = config.get("db")
const options = {
  explorer: true
}

export function createApp(core: IProWebCore) {  
  const app = express()
  // view engine setup
  app.set("views", path.resolve(__dirname, "../../views"))
  app.set("view engine", "pug")
  app.set("pool", createPool(dbConfig))
  app.set("userService", new core.Service.User(app.get("pool")))
  app.use(logger("dev"))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, "public")))
  // passport
  app.use(passport.initialize())
  passport.serializeUser(function(user, done) {
    done(null, user)
  })

  passport.deserializeUser(function(user, done) {
    done(null, user)
  })

  passport.use(setupJwtAuth())
  passport.use(setupPKAuth(app))
  //end passport

  app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerDoc, options))
  
  app.use("/", indexRouter)
   
  app.use(function(req, res, next) {
    next(createError(404))
  })
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}
    // render the error page
    res.status(err.status || 500)
    res.render("error")
  })

  //login/out
  app.post('/login', passport.authenticate("challenge", {session: false}), (req, res) => {
    //@ts-ignore
    res.json(req.user)
  })

  app.get("/logout", function(req, res, next) {
    res.json({auth: false})
  })
  //login/out
  
  return app
}

export default createApp
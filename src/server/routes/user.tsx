import express from "express"
import React from "react"
import ReactDOMServer from "react-dom/server"
import passport from "passport"
import { generateAccessToken, authenticateToken, setupJwtAuth } from "../utils"
import dotenv from "dotenv"
import { IUser } from "pro-web-core"

export default function _controller(router: express.Router) {
    router.get("/user/unique/:username", async function(req, res, next) {
        console.log("get the unique user name")
        const user: IUser = req.app.get("userService")
        const resp = await user.checkUsernameUnique(req.params.username)
        res.json(resp)
    })
    router.post("/user", function(req, res, next) {
        const username = req.body.username
        const publicKey = req.body.publicKey
        res.json({
            IsError: false,
            Message: "OK",
            Data: 1
        })
    })
    router.post("/user/request-session", function(req, res, next) {
        res.json({challenge: "xxx"})
    })
    router.get("/profile", authenticateToken, function(req, res, next) {
        res.json({auth: true})
    })
    router.get("/home", (req, res, next) => {
        res.json("home")
    })
    router.get("/user/:username", function(req, res, next) {
        res.json({username: "test"})
    })
    router.put("/user/:id", function(req, res, next) {
        res.json({
            updated: true
        })
    })
    router.delete("/user/:id", function(req, res, next) {
        res.statusCode = 405
        res.send()
    })
      //login/out
  router.post('/login', passport.authenticate("challenge", {session: false}), (req, res) => {
    //@ts-ignore
    res.json(req.user)
  })

  router.get("/logout", function(req, res, next) {
    res.json({auth: false})
  })
  //login/out

};

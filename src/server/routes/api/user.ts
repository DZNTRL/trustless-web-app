import express from "express"
import React from "react"
import ReactDOMServer from "react-dom/server"
import passport from "passport"
import * as validator from "express-validator"
import { authenticateToken, verifyNoToken} from "../../utils"
import { IUser } from "pro-web-core"
import { ResponseMessages } from "pro-web-core/dist/js/enums/ResponseMessages"
import Core from "pro-web-core"

export default function _controller(router: express.Router) {
    router.get("/user/unique/:username", async function(req, res, next) {
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
    router.get("/request-session/:username",
        verifyNoToken,
        validator.param("username").escape(),
        validator.param("username").stripLow(false),
        validator.param("username")
            .custom(async username => {
                const result = await Core.Validators.username.validate(username)
                if(result !== username) {
                    Promise.reject(result.toString())
                } else {
                    Promise.resolve()
                }
            })
        ,
        async function(req, res, next) {
            //@ts-ignore
            const errors = validator.validationResult(req).errors
            const resp = new Core.Response(null, "", true)
            if(errors.length > 0) {
                return res.json(new Core.Response(null, errors.join(","), true))
            }
            const user: IUser = req.app.get("userService")
            var challenge
            try {
                challenge = await user.requestLogin(req.params.username)                
            } catch(e) {
                res.statusCode = 500
                return res.json(resp)
            }
            if(challenge.Message === ResponseMessages.NotFound.toString()) {
                res.statusCode = 400
                return res.json(resp)
            }
            res.json(challenge)
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

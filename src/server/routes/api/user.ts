import express from "express"
import React from "react"
import ReactDOMServer from "react-dom/server"
import passport from "passport"
import * as validator from "express-validator"
import { authenticateToken, verifyNoToken, reportErrors} from "../../utils"
import { IUser } from "pro-web-common/dist/js/interfaces/service/IUser"
import { IUser as IModel } from "pro-web-common/dist/js/interfaces/models/IUser"
import { Response } from "pro-web-common/dist/js/Response"
import { ResponseMessages } from "pro-web-common/dist/js/enums/ResponseMessages"
import { Validators } from "pro-web-common/dist/js/validators"
import { publicKeyValidator } from "../../utils"


export default function _controller(router: express.Router) {
    router.get("/user/unique/:username",
        validator.param("username").escape(),
        validator.param("username").stripLow(false),
        validator.param("username").custom(async username => {
            const result = await Validators.username.validate(username)
            if(result !== username) {
                Promise.reject(result.toString())
            } else {
                Promise.resolve()
            }
        })
        ,
        async function(req, res, next) {
            var resp: Response<boolean> = new Response<boolean>()
            reportErrors(resp, req, res)
            console.log("this is my resp", resp)
            if(resp.IsError) {
                return res.json(resp)
            }
            const user: IUser = req.app.get("userService")
            resp = await user.checkUsernameUnique(req.params.username)
            console.log(resp)
            res.json(resp)
        }
    )
    router.post("/user", 
        verifyNoToken,
        validator.body("username").escape(),
        validator.body("username").stripLow(false),
        validator.body("username")
            .custom(async username => {
                const result = await Validators.username.validate(username)
                if(result !== username) {
                    Promise.reject(result.toString())
                }
            })
        ,
        validator.body("publicKey")
            .custom(async publicKey => {
                const result = await publicKeyValidator(publicKey)
                if(!result) {
                    Promise.reject("invalid public key")
                }
            })
        ,
        async function(req, res, next) {       
            //@ts-ignore
            console.log("requestbody", req.errors)     
            //@ts-ignore
            const errors = validator.validationResult(req).errors
            console.log("errors", errors)
            var resp = new Response<number>(0, "", true)
            const user: IUser = req.app.get("userService")
            if(errors.length > 0) {
                return res.json(new Response(null, errors.join(","), true))
            }
            const username = req.body.username
            const publicKey = req.body.publicKey
            try {
                resp = await user.createUser(username, publicKey)                
                console.log("resp from try", resp)
            } catch(e) {
                console.log("error while create user", e)
                res.statusCode = 500
                return res.json(resp)
            }
            res.json(resp)
        }
    )
    router.get("/request-session/:username",
        verifyNoToken,
        validator.param("username").escape(),
        validator.param("username").stripLow(false),
        validator.param("username")
            .custom(async username => {
                const result = await Validators.username.validate(username)
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
            const resp = new Response(null, "", true)

            if(errors.length > 0) {
                return res.json(new Response(null, errors.join(","), true))
            }
            const user: IUser = req.app.get("userService")
            var challenge
            try {
                challenge = await user.requestLogin(req.params.username)                
            } catch(e) {
                console.log("error while request login", e)
                res.statusCode = 500
                return res.json(resp)
            }
            if(challenge.Message === ResponseMessages.NotFound.toString()) {
                res.statusCode = 400
                return res.json(resp)
            }
            res.json(challenge)
        }
    )
    router.get("/profile", passport.authenticate("jwt"), function(req, res, next) {
        res.json({auth: true})
    })
    router.get("/home", (req, res, next) => {
        res.json("home")
    })
    router.get("/user/currentUser", passport.authenticate("jwt"), async function(req, res, next) {
        //@ts-ignore
        if(req.user === null) {
            return res.sendStatus(404)
        }
        //@ts-ignore
        const resp = new Response<IModel>(req.user)
        res.json(resp)
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
    router.post("/login", 
        validator.body("username").escape(),
        validator.body("username").stripLow(false),
        validator.body("username"),
        passport.authenticate("challenge"),
        (req, res) => {
            //@ts-ignore
            const user: { user: IModel, token: string}  = Object.assign({}, req.user)
            //@ts-ignore
            res.cookie("authorization", `Bearer ${user.token}`)
            //@ts-ignore
            res.json(new Response<IModel>(user.user))
        }
    )

    router.get("/logout/", passport.authenticate("jwt"), async function(req, res, next) {
        //@ts-ignore
        console.log("lgout user", req.user)
        const user: IUser = req.app.get("userService")
        //@ts-ignore
        let resp = await user.logout(req.user.username)
        if(resp.IsError) {
            //@ts-ignore
            console.log(`${req.user.username} could not be logged out:  ${resp.Message}`)
            return res.json(resp)
        }
        res.clearCookie("authorization")
        res.json("OK")                
    })

};

import express from "express"
import React from "react"
import ReactDOMServer from "react-dom/server"
import App from "../../client/App"
import validator from "express-validator"
import { generateAccessToken, authenticateToken } from "../utils"
import dotenv from "dotenv"

dotenv.config()

export default function _controller(router: express.Router) {
    /**
     * @swagger
     * /:
     *  get/unique:
     *      description: check to see if a given username is unique
     *      responses:
     *          200:
     *              description: return boolean indicating whether username exists
     *              schema: type: "Repsonse<boolean>"
     */
    router.get("/user/unique/:username", function(req, res, next) {
        res.json({username: req.params.username})
        
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
    router.post("/user/login", function(req, res, next) {
        const token = generateAccessToken(req.body.username, req.body.challenge, process.env.JWT_SECRET)
        res.json({token})
    })
    router.get("/user/logout", function(req, res, next) {
        res.json({auth: false})
    })
    router.get("/user/:username", function(req, res, next) {
        res.json({
            username: "test",
            publicKey: "test",
            id: 0
        })
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
};

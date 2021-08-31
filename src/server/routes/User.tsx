import express from "express"
import React from "react"
import ReactDOMServer from "react-dom/server"
import App from "../../client/App"
import validator from "express-validator"
import { generateAccessToken, authenticateToken } from "../utils"
import dotenv from "dotenv"

dotenv.config()

export default function _controller(router: express.Router) {
    /* GET home page. */
    router.get("/unique", function(req, res, next) {
        const app = ReactDOMServer.renderToString(<App />)
        res.render('home', { 
            title: 'test',
            content: app
        });
    });
    router.get("/profile", authenticateToken, function(req, res, next) {
        res.json({auth: true})
    })
    router.post("/login", function(req, res, next) {
        const token = generateAccessToken(req.body.username, req.body.challenge, process.env.JWT_SECRET)
        res.json({token})
    })
};

import express from "express"
import React from "react"
import passport from "passport"
import ReactDOMServer from "react-dom/server"
import App from "../../client/App"
import GettingIn from "../../client/sections/GettingIn"
import SessionBoard from "../../client/sections/SessionBoard"
import { verifyNoToken } from "../utils"

export default function _controller(router: express.Router) {
    /* GET home page. */
    router.get('/', function(req, res, next) {
        const app = ReactDOMServer.renderToString(<App />)
        res.render('home', { 
            title: 'test2',
            content: app
        });
    });
    router.get('/getting-in', verifyNoToken, function(req, res, next) {
        //@ts-ignore
        if(req.user) {
            return res.redirect("/")
        }
        const app = ReactDOMServer.renderToString(<GettingIn />)
        res.render('getting-in', {
            title: 'Getting In',
            content: app
        });
    });
    router.get("/session-board", passport.authenticate("jwt", { failureRedirect: "/getting-in"}), function(req, res, next) {
        const app = ReactDOMServer.renderToString(<SessionBoard />)
        res.render("session-board", {
            title: "Session Messenger Board",
            content: app
        })
    })
};

import express from "express"
import React from "react"
import passport from "passport"
import ReactDOMServer from "react-dom/server"
import App from "pro-web-app-cli-components/dist/js/App"
import SessionBoard from "pro-web-app-cli-components/dist/js/sections/SessionBoard"
import { verifyNoToken } from "../utils"
import request from "request"

export default function _controller(router: express.Router) {
    /* GET home page. */
    router.get("/", function(req, res, next) {
        const app = ReactDOMServer.renderToString(<App />)
        res.render("home", { 
            title: "test2",
            content: app
        })
    })
    router.get("/getting-in", verifyNoToken, function(req, res, next) {
        //@ts-ignore
        if(req.user) {
            return res.redirect("/")
        }
        const app = ReactDOMServer.renderToString(<App />)
        res.render("getting-in", {
            title: "Getting In",
            content: app
        })
    })
    router.get("/session-board", passport.authenticate("jwt", { failureRedirect: "/getting-in"}), function(req, res, next) {
        const app = ReactDOMServer.renderToString(<SessionBoard />)
        res.render("session-board", {
            title: "Session Messenger Board",
            content: app
        })
    })
    router.get("/storybook", function(req, res, next) {
        request("http://localhost:6006").pipe(res)
    })
    router.get(/\.manager\.bundle\.js/, function(req, res, next) {
        request(`http://localhost:6006/${req.path}`).pipe(res)
    })
    router.get(/iframe\.html/, function(req, res, next) {
        request(`http://localhost:6006/${req.path}`).pipe(res)
    })
    router.get(/iframe\.bundle\.js/, function(req, res, next) {
        request(`http://localhost:6006/${req.path}`).pipe(res)
    })
    router.get(/static\/media\/src/, function(req, res, next) {
        request(`http://localhost:6006/${req.path}`).pipe(res)
    })
    router.get(/.*hmr$/, function(req, res) {
        request(`http://localhost:6006/${req.path}`).pipe(res)
    })
};

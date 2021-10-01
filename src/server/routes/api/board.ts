import express from "express"
import React from "react"
import ReactDOMServer from "react-dom/server"
import App from "../../../client/App"
import passport from "passport"

export default function _controller(router: express.Router) {
    /* GET home page. */
    router.get('/board/:slug', passport.authenticate("jwt"), function(req, res, next) {
        res.json(`board${req.params.slug}`)
    });

};

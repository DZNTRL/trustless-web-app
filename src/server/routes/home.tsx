import express from "express"
import React from "react"
import ReactDOMServer from "react-dom/server"
import App from "../../client/App"

export default function _controller(router: express.Router) {
    /* GET home page. */
    router.get('/', function(req, res, next) {
        const app = ReactDOMServer.renderToString(<App />)
        console.log("app", app)
        res.render('home', { 
            title: 'test',
            content: app
        });
    });

};

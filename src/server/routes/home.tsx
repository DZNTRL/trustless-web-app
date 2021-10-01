import express from "express"
import React from "react"
import ReactDOMServer from "react-dom/server"
import App from "../../client/App"
import GettingIn from "../../client/sections/GettingIn"

export default function _controller(router: express.Router) {
    /* GET home page. */
    router.get('/', function(req, res, next) {
        const app = ReactDOMServer.renderToString(<App />)
        res.render('home', { 
            title: 'test2',
            content: app
        });
    });
    router.get('/getting-in', function(req, res, next) {
        const app = ReactDOMServer.renderToString(<GettingIn />)
        res.render('getting-in', {
            title: 'Getting In',
            content: app
        });
    });

};

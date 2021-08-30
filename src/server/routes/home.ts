import express from "express"

export default function _controller(router: express.Router) {
    /* GET home page. */
    router.get('/', function(req, res, next) {
    res.render('home', { 
        title: 'test',
        });
    });

};

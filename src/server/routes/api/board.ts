import express from "express"
import passport from "passport"

export default function _controller(router: express.Router) {
    /* GET home page. */
    router.get('/board/:slug', passport.authenticate("jwt"), function(req, res, next) {
        //@ts-ignore
        res.json(`board${req.params.slug}`)
    });

};

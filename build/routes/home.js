"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _controller(router) {
    router.get('/', function (req, res, next) {
        res.render('home', {
            title: 'test',
        });
    });
}
exports.default = _controller;
;
//# sourceMappingURL=home.js.map
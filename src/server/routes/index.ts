import express from "express"
import home from "./home"

const router = express.Router();
home(router)

module.exports = router;

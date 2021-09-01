import express from "express"
import home from "./home"
import user from "./user"

const router = express.Router();
home(router)
user(router)

export default router
import express from "express"
import home from "./home"
import user from "./user"
import board from "./board"

const router = express.Router()
home(router)
user(router)
board(router)

export default router
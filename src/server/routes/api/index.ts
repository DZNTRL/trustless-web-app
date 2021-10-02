import express from "express"
import user from "./user"
import board from "./board"

const router = express.Router()
user(router)
board(router)

export default router
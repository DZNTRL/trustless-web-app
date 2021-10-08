import jwt from "jsonwebtoken"
import config from "config"
import dotenv from "dotenv"
import passportJWT from "passport-jwt"
import LocalStrategy from "passport-local"
import CookieParser from "cookie-parser"
import express from "express"
import { IUser } from "pro-web-core"

export function getJWT(request) {
  const authHeader = request.cookies["authorization"]
  return authHeader;
}

export function generateAccessToken(user: IUser, secret: string) {
    var expiry = config.get("jwtTimeout")
    return jwt.sign({data: user}, secret, { expiresIn: 60*60 });
}

export function authenticateToken(req, res, next) {
  const token = getJWT(req)
  if (!token) return res.sendStatus(401)
  jwt.verify(token, process.env.TOKEN_SECRET as string, (req: express.Request, err: any, user: any) => {
    if (err) return res.sendStatus(403)
    //@ts-ignore
    req.user = user

    next()
  })
}

export function verifyNoToken(req, res, next) {
  const token = getJWT(req)
  console.log("verify no token", token)
  if(token) {
    res.statusCode = 400
    return res.send("")
  } else {
    next()
  }
}

export function setupJwtAuth() {
  dotenv.config()
  const options = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: (request) => {
      const result = getJWT(request)
      console.log("result", result)
      return result
    },
    aud: "http://localhost"
  }
  const verify = (jwtPayload, done: (err, user, info) => void) => {
    console.log('in verify jwt')
    if(!jwtPayload.data) {
      return done(null, null, null)
    }
    if(jwtPayload.exp * 1000 < Date.now()) {
      return done(null, null, null)
    }
    done(null, jwtPayload.data, {})
  }

  const strategy = new passportJWT.Strategy(options, verify)
  return strategy
}

export function setupPKAuth(app: express.Application) {
  const localStrategy = new LocalStrategy(
    async function(username, challenge, done) {
      const userService: IUser = app.get("userService")
      const challengeResp = await userService.login(username, challenge)
      if(challengeResp.IsError) {
        return done(challengeResp.Message, null)
      }
      if(challengeResp.Data === false) {
        return done(null, { token: null })
      }
      const userResp = await userService.get(username)
      if(userResp.IsError) {
        return done(userResp.Message, {token: null})
      } else {
        dotenv.config()
        //@ts-ignore
        const token = generateAccessToken(userResp.Data, process.env.JWT_SECRET)
        return done(null, { token })  
      }
    }
  )
  localStrategy.name = "challenge"
  return localStrategy
}

export function setupCookieParser() {
  dotenv.config()
  const options = config.get("cookieSettings")
  return CookieParser(process.env.COOKIE_SIGNER, {httpOnly: false})
}
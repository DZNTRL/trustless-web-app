import jwt from "jsonwebtoken"
import config from "config"
import dotenv from "dotenv"
import passportJWT from "passport-jwt"
import LocalStrategy from "passport-local"
import express from "express"
import { IUser, ProWebEnums } from "pro-web-core"
export function getJWT(request) {
  const authHeader = request.headers["authorization"]
  const token = authHeader && authHeader.split(' ')[1]
  return token;
}

export function generateAccessToken(user: IUser, secret: string) {
    var expiry = config.get("jwtTimeout")
    return jwt.sign({data: user}, secret, { expiresIn: 60*60 });
}

export function authenticateToken(req, res, next) {
  const token = getJWT(req)
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

export function setupJwtAuth() {
  dotenv.config()
  const options = {
    secretOrKeyProvider: process.env.JWT_SECRET,
    jwtFromRequest: (request) => {
      return getJWT(request)
    },
    issuer: "localhost",
    aud: "jbotwapi"
  }
  const verify = (jtwPayload, done: (err, user, info) => void) => {
    console.log("verify()payload", jtwPayload)
    done(null, {test: "test"}, {})
  }

  const strategy = new passportJWT.Strategy(options, verify)
  return strategy
}

export function setupPKAuth(app: express.Application) {
  const localStrategy = new LocalStrategy(
    async function(username, challenge, done) {
      const userService: IUser = app.get("userService")
      const challengeResp = await userService.verifyChallenge(username, challenge)
      if(challengeResp.IsError) {
        return done(challengeResp.Message, null)
      }
      if(challengeResp.Data === false) {
        return done(null, { token: null })  
      }
      const userResp = await userService.get(username)
      if(userResp.IsError) {
        return done(userResp.Message, null)
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
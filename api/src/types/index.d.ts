import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

export type TEmail = {
    email: string
}

export type TPassword = {
    password: string
}

export type TAuthSignin = TEmail & TPassword

export type TAuthSignup = TAuthSignin & {
    username: string
}

export type TVerifyAccount = {
    otp: number,
    email: string,
    hash: string
}

export interface IRequest extends Request {
    userdata?: TEmail
}

export type TTokens = {
    accessToken: string
    refreshToken: string
}

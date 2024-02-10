import { Request, Response } from "express"
import { TAuthSignup, TEmail, TVerifyAccount } from "../types"
import userRepository from "../repository/UserRepository"
import hashService from "../services/HashService"
import OtpService from "../services/OtpService"
import MailService from "../services/MailService"
import JwtService from "../services/JwtService"
import TokenRepository from "../repository/TokenRepository"


class AuthController {

    async signUp(request: Request, response: Response) {

        try {
            // check request.body
            const { username, email, password }: TAuthSignup = request.body
            if (!username || !email || !password) {
                return response.status(400).json({
                    "timestamp": new Date().toISOString(),
                    "status": 400,
                    "error": "Bad Request",
                    "message": "Required request body is missing",
                    "path": `${request.route.path}`
                })
            }

            // check User.Email exists
            let user = await userRepository.getUserByEmailID({
                email: email
            })
            if (user) {
                return response.status(400).json({
                    "timestamp": new Date().toISOString(),
                    "status": 400,
                    "error": "Bad Request",
                    "message": "Email already exists",
                    "path": `${request.route.path}`
                })
            }

            // create User
            user = await userRepository.createUser({
                username: username,
                email: email,
                password: await hashService.getHash(password)
            })

            if (!user) {
                return response.status(500).json({
                    "timestamp": new Date().toISOString(),
                    "status": 500,
                    "error": "Sign-up error",
                    "message": "Unable to sign-up, please try again later",
                    "path": `${request.route.path}`
                })
            }

            // return response 
            return response.status(201).json({
                "timestamp": new Date().toISOString(),
                "status": 201,
                "error": "",
                "message": "User successfully signed up",
                "user": user!,
                "path": `${request.route.path}`
            })
        }
        catch (error: any) {
            console.error(error)
            return response.status(500).json({
                "timestamp": new Date().toISOString(),
                "status": 500,
                "error": `${error.toString()}`,
                "message": "Something went wrong, please try again.",
                "path": `${request.route.path}`
            })
        }

    }

    async signIn(request: Request, response: Response) {

        try {
            // check request.body
            const { email, password }: TAuthSignup = request.body
            if (!email || !password) {
                return response.status(400).json({
                    "timestamp": new Date().toISOString(),
                    "status": 400,
                    "error": "Bad Request",
                    "message": "Required request body is missing",
                    "path": `${request.route.path}`
                })
            }

            // check User.Email exists
            let user = await userRepository.getUserByEmailID({
                email: email
            })
            if (!user) {
                return response.status(400).json({
                    "timestamp": new Date().toISOString(),
                    "status": 400,
                    "error": "Bad Request",
                    "message": "User does not exists",
                    "path": `${request.route.path}`
                })
            }

            // compare passwords
            if (!(await hashService.compareHash(password, user.password))) {
                return response.status(401).json({
                    "timestamp": new Date().toISOString(),
                    "status": 401,
                    "error": "Unauthorized",
                    "message": "Invalid password, please try again later",
                    "path": `${request.route.path}`
                })
            }

            // create jwt token
            const accessToken: string = await JwtService.sign({
                email: email
            })
            const refreshToken: string = await JwtService.sign({
                email: user.id
            })

            // store refresh token in database 
            const token = await TokenRepository.storeToken({
                userid: user.id,
                token: refreshToken
            })
            if (!token) {
                throw new Error()
            }

            // set token in cookie
            response.cookie("accessToken", accessToken)
            response.cookie("refreshToken", refreshToken)

            // return response 
            return response.status(201).json({
                "timestamp": new Date().toISOString(),
                "status": 201,
                "error": "",
                "message": "User successfully signed up",
                "user": user,
                "path": `${request.route.path}`
            })
        }
        catch (error: any) {
            console.error(error)
            return response.status(500).json({
                "timestamp": new Date().toISOString(),
                "status": 500,
                "error": `${error.toString()}`,
                "message": "Something went wrong, please try again.",
                "path": `${request.route.path}`
            })
        }
    }

    async sendOtp(request: Request, response: Response) {

        try {
            // check request.body
            const { email }: TEmail = request.body
            if (!email) {
                return response.status(400).json({
                    "timestamp": new Date().toISOString(),
                    "status": 400,
                    "error": "Bad Request",
                    "message": "Required request body is missing",
                    "path": `${request.route.path}`
                })
            }

            // check User.Email exists
            const user = await userRepository.getUserByEmailID({
                email: email
            })!
            if (!user) {
                return response.status(400).json({
                    "timestamp": new Date().toISOString(),
                    "status": 400,
                    "error": "Bad Request",
                    "message": "Email already exists",
                    "path": `${request.route.path}`
                })
            }

            // generate otp, hash it 
            const otp: number = OtpService.generateOtp()
            const otphash: string = await OtpService.getOtpHash({
                otp: otp,
                email: email
            })

            // and send it to user over mail
            await MailService.sendVerificationOtp({
                email: email,
                otp: otp,
                username: user.username
            })

            // return response 
            return response.status(200).json({
                "timestamp": new Date().toISOString(),
                "status": 200,
                "error": "",
                "message": "Otp successfully sent.",
                "user": user!,
                "hash": otphash,
                "path": `${request.route.path}`
            })
        }
        catch (error: any) {
            console.error(error)
            return response.status(500).json({
                "timestamp": new Date().toISOString(),
                "status": 500,
                "error": `${error.toString()}`,
                "message": "Something went wrong, please try again.",
                "path": `${request.route.path}`
            })
        }
    }

    async verifyOtp(request: Request, response: Response) {

        try {
            // check request.body
            const { otp, email, hash }: TVerifyAccount = request.body
            if (!otp || !email || !hash) {
                return response.status(400).json({
                    "timestamp": new Date().toISOString(),
                    "status": 400,
                    "error": "Bad Request",
                    "message": "Required request body is missing",
                    "path": `${request.route.path}`
                })
            }

            // check User.Email exists
            let user = await userRepository.getUserByEmailID({
                email: email
            })!
            if (!user) {
                return response.status(400).json({
                    "timestamp": new Date().toISOString(),
                    "status": 400,
                    "error": "Bad Request",
                    "message": "Email already exists",
                    "path": `${request.route.path}`
                })
            }

            // verify the hashed otp
            const isvalid: boolean = await OtpService.verifyHashedOtp(
                { otp, email, hash }
            )
            if (!isvalid) {
                return response.status(200).json({
                    "timestamp": new Date().toISOString(),
                    "status": 200,
                    "error": "",
                    "message": "Invalid otp.",
                    "user": user!,
                    "path": `${request.route.path}`
                })
            }

            user = await userRepository.setUserVerification({
                email: email,
                status: isvalid
            })
            if (!user) {
                throw new Error()
            }
            // return response 
            return response.status(200).json({
                "timestamp": new Date().toISOString(),
                "status": 200,
                "error": "",
                "message": "Otp successfully verified.",
                "user": user!,
                "path": `${request.route.path}`
            })
        }
        catch (error: any) {
            console.error(error)
            return response.status(500).json({
                "timestamp": new Date().toISOString(),
                "status": 500,
                "error": `${error.toString()}`,
                "message": "Something went wrong, please try again.",
                "path": `${request.route.path}`
            })
        }
    }

}

export default new AuthController()

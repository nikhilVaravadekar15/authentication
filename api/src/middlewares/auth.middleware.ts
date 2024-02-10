import { NextFunction, Request, Response } from "express";
import { IRequest, TEmail, TTokens } from "../types";
import JwtService from "../services/JwtService";
import TokenRepository from "../repository/TokenRepository";


async function authMiddleware(request: IRequest, response: Response, next: NextFunction) {

    try {

        // Get cookies data from request
        const { accessToken, refreshToken }: TTokens = request.cookies!
        // 2. check if tokens exists
        if (!accessToken || !refreshToken) {
            throw new Error();
        }

        // verify access token
        const { email: user_email } = await JwtService.verify(accessToken) as TEmail
        const { email: userid } = await JwtService.verify(refreshToken) as TEmail

        // check refreshtoken exists in database
        const token = await TokenRepository.getTokenByUserId(userid)
        if (!token) {
            throw new Error()
        }

        if (token.token != refreshToken) {
            await TokenRepository.deleteTokenByUserId(userid)
            throw new Error()
        }

        // add userdata back in request
        if (request.userdata == undefined) {
            request.userdata = {
                "email": user_email
            };
        }

        // NextFunction
        next();
    }
    catch (error: any) {
        console.error(error)
        response.clearCookie("refreshToken")
        response.clearCookie("accessToken")
        return response.status(401).json({
            "timestamp": new Date().toISOString(),
            "status": 401,
            "error": `${error.toString()}`,
            "message": "Unauthorized",
            "path": `${request.route.path}`
        })
    }


}

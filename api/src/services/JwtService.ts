import jwt from "jsonwebtoken";
import { TEmail } from "../types";


class JwtService {

    private JWT_HASH_SECRET: string
    private JWT_EXPIRATION_TIME: string

    constructor() {
        const JWT_HASH_SECRET: string = process.env.JWT_HASH_SECRET!;
        const JWT_EXPIRATION_TIME: string = process.env.JWT_EXPIRATION_TIME!;
        if (!JWT_HASH_SECRET || !JWT_EXPIRATION_TIME) {
            throw new Error("Set jwt hash or expiration time in .env file")
        }
        this.JWT_HASH_SECRET = process.env.JWT_HASH_SECRET!;
        this.JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME!;
    }

    async sign({ email: payload }: TEmail) {
        return await jwt.sign(
            {
                email: payload
            },
            this.JWT_HASH_SECRET,
            {
                algorithm: "HS256",
                expiresIn: this.JWT_EXPIRATION_TIME,
                mutatePayload: false
            }
        )
    }

    async verify(token: string) {
        return await jwt.verify(
            token,
            this.JWT_HASH_SECRET,
        ) as TEmail
    }
}

export default new JwtService()

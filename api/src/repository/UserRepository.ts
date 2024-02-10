import { eq } from "drizzle-orm";
import { db } from "../database/index";
import { user } from "../database/schema";
import { TAuthSignup, TEmail } from "../types";


class UserRepository {

    async createUser({ username, email, password: encryptedPassword }: TAuthSignup) {
        return (await db.insert(user).values({
            username: username,
            email: email,
            password: encryptedPassword,
        }).returning())[0];
    }

    async getUserByEmailID({ email }: TEmail) {
        return (
            await db.select().from(user).where(eq(user.email, email))
        )[0];
    }

    async setUserVerification({ email, status }: TEmail & { status: boolean }) {
        return (
            await db.update(user).set({
                is_verified: status
            }).where(eq(user.email, email)).returning()
        )[0];
    }

}

export default new UserRepository()

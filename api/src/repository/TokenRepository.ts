import { eq } from "drizzle-orm";
import { db } from "../database/index";
import { token } from "../database/schema";

class TokenRepository {
  async storeToken({
    userid,
    token: refresh_token,
  }: {
    userid: string;
    token: string;
  }) {
    return (
      await db
        .insert(token)
        .values({
          user: userid,
          token: refresh_token,
        })
        .returning()
    )[0];
  }

  async getTokenByUserId(userid: string) {
    return (await db.select().from(token).where(eq(token.user, userid)))[0];
  }

  async deleteTokenByUserId(userid: string) {
    return (
      await db.delete(token).where(eq(token.user, userid)).returning()
    )[0];
  }
}

export default new TokenRepository();

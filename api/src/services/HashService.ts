import bcrypt from "bcrypt";


class HashService {
    private saltRounds = 10;

    async getHash(text: string) {
        let salt = await bcrypt.genSalt(this.saltRounds);
        return await bcrypt.hash(text, salt);
    }

    async compareHash(text: string, hash: string) {
        return await bcrypt.compare(text, hash);
    }

}

export default new HashService();

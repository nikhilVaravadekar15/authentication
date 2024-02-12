import crypto from "crypto";
import HashService from "./HashService";
import { TEmail, TVerifyAccount } from "../types";

class OtpService {
  private TIME_TO_LIVE: string; // time-to-live (default: 3min)

  constructor() {
    this.TIME_TO_LIVE = process.env.TIME_TO_LIVE!;
  }

  generateOtp(): number {
    const otp: number = crypto.randomInt(100000, 999999);
    return otp;
  }

  async getOtpHash({
    otp,
    email,
  }: TEmail & {
    otp: number;
  }) {
    const expire_time = Date.now() + this.TIME_TO_LIVE;
    const hash: string = await HashService.getHash(
      `${email}.${otp}.${expire_time}`
    ); // hash = email + otp + expire_time
    return `${hash}+${expire_time}`;
  }

  async verifyHashedOtp({ otp, email, hash }: TVerifyAccount) {
    const [receivedHash, expire_time] = hash.split("+");
    const data: string = `${email}.${otp}.${expire_time}`;

    if (Date.now() > +expire_time) {
      return false;
    }

    if (!(await HashService.compareHash(data, receivedHash))) {
      return false;
    }

    return true;
  }
}

export default new OtpService();

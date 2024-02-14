import { Request, Response } from "express";
import {
  IRequest,
  TAuthSignup,
  TEmail,
  TPassword,
  TTokens,
  TVerifyAccount,
} from "../types";
import userRepository from "../repository/UserRepository";
import hashService from "../services/HashService";
import OtpService from "../services/OtpService";
import MailService from "../services/MailService";
import JwtService from "../services/JwtService";
import TokenRepository from "../repository/TokenRepository";
import UserDto from "../dtos/UserDto";

class AuthController {
  async signUp(request: Request, response: Response) {
    try {
      // check request.body
      const { username, email, password }: TAuthSignup = request.body;
      if (!username || !email || !password) {
        return response.status(400).json({
          timestamp: new Date().toISOString(),
          status: 400,
          error: "Bad Request",
          message: "Required request body is missing",
          path: `${request.route.path}`,
        });
      }

      // check User.Email exists
      let user = await userRepository.getUserByEmailID({
        email: email,
      });
      if (user) {
        return response.status(400).json({
          timestamp: new Date().toISOString(),
          status: 400,
          error: "Bad Request",
          message: "Email already exists",
          path: `${request.route.path}`,
        });
      }

      // create User
      user = await userRepository.createUser({
        username: username,
        email: email,
        password: await hashService.getHash(password),
      });

      if (!user) {
        return response.status(500).json({
          timestamp: new Date().toISOString(),
          status: 500,
          error: "Sign-up error",
          message: "Unable to sign-up, please try again later",
          path: `${request.route.path}`,
        });
      }

      // return response
      return response.status(201).json({
        timestamp: new Date().toISOString(),
        status: 201,
        error: "",
        message: "User successfully signed up",
        user: new UserDto(user!.username, user.email, user.is_verified),
        path: `${request.route.path}`,
      });
    } catch (error: any) {
      console.error(error);
      return response.status(500).json({
        timestamp: new Date().toISOString(),
        status: 500,
        error: `${error.toString()}`,
        message: "Something went wrong, please try again.",
        path: `${request.route.path}`,
      });
    }
  }

  async signIn(request: Request, response: Response) {
    try {
      // check request.body
      const { email, password }: TAuthSignup = request.body;
      if (!email || !password) {
        return response.status(400).json({
          timestamp: new Date().toISOString(),
          status: 400,
          error: "Bad Request",
          message: "Required request body is missing",
          path: `${request.route.path}`,
        });
      }

      // check User.Email exists
      let user = await userRepository.getUserByEmailID({
        email: email,
      });
      if (!user) {
        return response.status(400).json({
          timestamp: new Date().toISOString(),
          status: 400,
          error: "Bad Request",
          message: "User does not exists",
          path: `${request.route.path}`,
        });
      }

      // compare passwords
      if (!(await hashService.compareHash(password, user.password))) {
        return response.status(401).json({
          timestamp: new Date().toISOString(),
          status: 401,
          error: "Unauthorized",
          message: "Invalid password, please try again later",
          path: `${request.route.path}`,
        });
      }

      // create jwt token
      const accessToken: string = await JwtService.sign({
        email: email,
      });
      const refreshToken: string = await JwtService.sign({
        email: user.id,
      });

      // store refresh token in database
      const token = await TokenRepository.storeToken({
        userid: user.id,
        token: refreshToken,
      });
      if (!token) {
        throw new Error();
      }

      // set token in cookie
      response.cookie("accessToken", accessToken, {
        maxAge: Date.now() + 1000 * 60 * 60 * 24,
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
      response.cookie("refreshToken", refreshToken, {
        maxAge: Date.now() + 1000 * 60 * 60 * 24,
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });

      // return response
      return response.status(200).json({
        timestamp: new Date().toISOString(),
        status: 200,
        error: "",
        message: "User successfully signed in",
        user: new UserDto(user!.username, user.email, user.is_verified),
        path: `${request.route.path}`,
      });
    } catch (error: any) {
      console.error(error);
      return response.status(500).json({
        timestamp: new Date().toISOString(),
        status: 500,
        error: `${error.toString()}`,
        message: "Something went wrong, please try again.",
        path: `${request.route.path}`,
      });
    }
  }

  async forgetPassword(request: Request, response: Response) {
    try {
      // check request.body
      const { email }: TEmail = request.body;
      if (!email) {
        return response.status(400).json({
          timestamp: new Date().toISOString(),
          status: 400,
          error: "Bad Request",
          message: "Required request body is missing",
          path: `${request.route.path}`,
        });
      }

      // check User.Email exists
      let user = await userRepository.getUserByEmailID({
        email: email,
      });
      if (!user) {
        return response.status(400).json({
          timestamp: new Date().toISOString(),
          status: 400,
          error: "Bad Request",
          message: "User does not exists",
          path: `${request.route.path}`,
        });
      }

      // create jwt token from email
      const token: string = await JwtService.sign({
        email: email,
      });

      // expire time
      const expire_time = Date.now() + process.env.TIME_TO_LIVE!;

      // generate hash = token + expire_time
      const hashed: string = `${token}+${expire_time}`;

      const VITE_BASE_URL: string = process.env.VITE_BASE_URL!;
      if (!VITE_BASE_URL) {
        throw new Error("Base url not set");
      }
      const link: string = `${VITE_BASE_URL}/auth/reset-password?q=${hashed}`;

      // send forget password link mail to user
      await MailService.sendForgetPasswordLink({
        username: user.username,
        email: user.email,
        link: link,
      });

      // return response
      return response.status(200).json({
        timestamp: new Date().toISOString(),
        status: 200,
        error: "",
        message: "Password reset mail sent",
        user: new UserDto(user!.username, user.email, user.is_verified),
        path: `${request.route.path}`,
      });
    } catch (error: any) {
      console.error(error);
      return response.status(500).json({
        timestamp: new Date().toISOString(),
        status: 500,
        error: `${error.toString()}`,
        message: "Something went wrong, please try again.",
        path: `${request.route.path}`,
      });
    }
  }

  async resetPassword(request: Request, response: Response) {
    try {
      // check request.body
      const { token, data }: { token: string; data: TPassword } = request.body;
      if (!token || !data.password) {
        return response.status(400).json({
          timestamp: new Date().toISOString(),
          status: 400,
          error: "Bad Request",
          message: "Required request body is missing",
          path: `${request.route.path}`,
        });
      }

      console.log(token.split("+"));
      // split token
      const [receivedHash, expire_time] = token.split("+");
      console.log(receivedHash);
      console.log(expire_time);

      // check current time is grater than expire_time
      if (Date.now() > +expire_time) {
        return response.status(400).json({
          timestamp: new Date().toISOString(),
          status: 400,
          error: "Bad Request",
          message: "Link expired, please try again later",
          path: `${request.route.path}`,
        });
      }

      // verify jwt token
      const { email }: TEmail = await JwtService.verify(receivedHash);

      // check User.Email exists
      let user = await userRepository.getUserByEmailID({
        email: email,
      });
      if (!user) {
        return response.status(400).json({
          timestamp: new Date().toISOString(),
          status: 400,
          error: "Bad Request",
          message: "User does not exists",
          path: `${request.route.path}`,
        });
      }

      // update password in db
      user = await userRepository.setUserUpdatedPassword({
        email: user.email,
        password: await hashService.getHash(data.password),
      });
      if (!user) {
        throw new Error();
      }

      // return response
      return response.status(200).json({
        timestamp: new Date().toISOString(),
        status: 200,
        error: "",
        message: "Password reset mail sent",
        user: new UserDto(user!.username, user.email, user.is_verified),
        path: `${request.route.path}`,
      });
    } catch (error: any) {
      console.error(error);
      return response.status(500).json({
        timestamp: new Date().toISOString(),
        status: 500,
        error: `${error.toString()}`,
        message: "Something went wrong, please try again.",
        path: `${request.route.path}`,
      });
    }
  }

  async sendOtp(request: Request, response: Response) {
    try {
      // check request.body
      const { email }: TEmail = request.body;
      if (!email) {
        return response.status(400).json({
          timestamp: new Date().toISOString(),
          status: 400,
          error: "Bad Request",
          message: "Required request body is missing",
          path: `${request.route.path}`,
        });
      }

      // check User.Email exists
      const user = await userRepository.getUserByEmailID({
        email: email,
      })!;
      if (!user) {
        return response.status(400).json({
          timestamp: new Date().toISOString(),
          status: 400,
          error: "Bad Request",
          message: "Email already exists",
          path: `${request.route.path}`,
        });
      }

      // generate otp, hash it
      const otp: number = OtpService.generateOtp();
      const otphash: string = await OtpService.getOtpHash({
        otp: otp,
        email: email,
      });

      // and send it to user over mail
      await MailService.sendVerificationOtp({
        email: email,
        otp: otp,
        username: user.username,
      });

      // return response
      return response.status(200).json({
        timestamp: new Date().toISOString(),
        status: 200,
        error: "",
        message: "Otp successfully sent.",
        user: new UserDto(user!.username, user.email, user.is_verified),
        hash: otphash,
        path: `${request.route.path}`,
      });
    } catch (error: any) {
      console.error(error);
      return response.status(500).json({
        timestamp: new Date().toISOString(),
        status: 500,
        error: `${error.toString()}`,
        message: "Something went wrong, please try again.",
        path: `${request.route.path}`,
      });
    }
  }

  async verifyOtp(request: Request, response: Response) {
    try {
      // check request.body
      const { otp, email, hash }: TVerifyAccount = request.body;
      if (!otp || !email || !hash) {
        return response.status(400).json({
          timestamp: new Date().toISOString(),
          status: 400,
          error: "Bad Request",
          message: "Required request body is missing",
          path: `${request.route.path}`,
        });
      }

      // check User.Email exists
      let user = await userRepository.getUserByEmailID({
        email: email,
      })!;
      if (!user) {
        return response.status(400).json({
          timestamp: new Date().toISOString(),
          status: 400,
          error: "Bad Request",
          message: "Email already exists",
          path: `${request.route.path}`,
        });
      }

      // verify the hashed otp
      const isvalid: boolean = await OtpService.verifyHashedOtp({
        otp,
        email,
        hash,
      });
      if (!isvalid) {
        return response.status(200).json({
          timestamp: new Date().toISOString(),
          status: 200,
          error: "",
          message: "Invalid otp.",
          user: new UserDto(user!.username, user.email, user.is_verified),
          path: `${request.route.path}`,
        });
      }

      // set user verification in db
      user = await userRepository.setUserVerification({
        email: email,
        status: isvalid,
      });
      if (!user) {
        throw new Error();
      }

      // send Onboarding mail to user
      await MailService.sendOnboardingMail({
        email: user.email!,
      });

      // return response
      return response.status(200).json({
        timestamp: new Date().toISOString(),
        status: 200,
        error: "",
        message: "Otp successfully verified.",
        user: new UserDto(user!.username, user.email, user.is_verified),
        path: `${request.route.path}`,
      });
    } catch (error: any) {
      console.error(error);
      return response.status(500).json({
        timestamp: new Date().toISOString(),
        status: 500,
        error: `${error.toString()}`,
        message: "Something went wrong, please try again.",
        path: `${request.route.path}`,
      });
    }
  }

  async refresh(request: IRequest, response: Response) {
    try {
      // Get userdata from request set by the auth middleware
      const { email }: TEmail = request.userdata!;
      // check if email exists
      if (!email) {
        throw new Error("Unauthorized");
      }

      // check User.Email exists
      let user = await userRepository.getUserByEmailID({
        email: email,
      });
      if (!user) {
        throw new Error("Unauthorized");
      }

      // return response
      return response.status(200).json({
        timestamp: new Date().toISOString(),
        status: 200,
        error: "",
        message: "Data refreshed",
        user: new UserDto(user!.username, user.email, user.is_verified),
        path: `${request.route.path}`,
      });
    } catch (error: any) {
      console.error(error);

      response.clearCookie("refreshToken");
      response.clearCookie("accessToken");

      return response.status(401).json({
        timestamp: new Date().toISOString(),
        status: 401,
        error: `${error.toString()}`,
        message: "Unauthorized",
        path: `${request.route.path}`,
      });
    }
  }
}

export default new AuthController();

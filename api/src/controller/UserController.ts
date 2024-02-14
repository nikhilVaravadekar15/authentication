import { Request, Response } from "express";
import { IRequest, TEmail } from "../types";
import UserRepository from "../repository/UserRepository";
import UserDto from "../dtos/UserDto";

class UserController {
  async getUserData(request: IRequest, response: Response) {
    try {
      // Get userdata from request set by the auth middleware
      const { email }: TEmail = request.userdata!;
      // check if email exists
      if (!email) {
        throw new Error("Unauthorized");
      }

      // check User.Email exists
      let user = await UserRepository.getUserByEmailID({
        email: email,
      });
      if (!user) {
        throw new Error("Unauthorized");
      }

      return response.status(200).json({
        timestamp: new Date().toISOString(),
        status: 200,
        error: "",
        message: "User logged out",
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
        message: "User logged out",
        path: `${request.route.path}`,
      });
    }
  }
}

export default new UserController();

import { z } from "zod";
import {
  signinSchema,
  signupSchema,
  emailSchema,
  passwordSchema,
} from "../zod/index";

export type TEmail = z.infer<typeof emailSchema>;
export type TPassword = z.infer<typeof passwordSchema>;

export type TUsersignin = z.infer<typeof signinSchema>;
export type TUsersignup = z.infer<typeof signupSchema>;

export type TUser = {
  username: string;
  email: string;
  is_verified: boolean;
};

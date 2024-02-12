import axios, { AxiosRequestConfig } from "axios";
import { TEmail, TPassword, TUsersignin, TUsersignup } from "../types";

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_PUBLIC_BASE_API_URL!,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export async function userSignUp({ username, email, password }: TUsersignup) {
  return await axios.post(
    "/api/auth/sign-up",
    {
      username: username,
      email: email,
      password: password,
    },
    axiosRequestConfig
  );
}

export async function userSignin({ email, password }: TUsersignin) {
  return await axios.post(
    "/api/auth/sign-in",
    {
      email: email,
      password: password,
    },
    axiosRequestConfig
  );
}

export async function forgetPassword({ email }: TEmail) {
  return await axios.post(
    "/api/auth/forget-password",
    {
      email: email,
    },
    axiosRequestConfig
  );
}

export async function resetPassword({
  token,
  data,
}: {
  token: string;
  data: TPassword;
}) {
  return await axios.post(
    "/api/auth/reset-password",
    {
      token: token,
      data: data,
    },
    axiosRequestConfig
  );
}

export async function sendOtp({ email }: TEmail) {
  return await axios.post(
    "/api/auth/send-otp",
    {
      email: email,
    },
    axiosRequestConfig
  );
}

export async function verifyOtp({
  hash,
  email,
  otp,
}: {
  hash: string;
  email: string;
  otp: number;
}) {
  return await axios.post(
    "/api/auth/verify-otp",
    {
      hash: hash,
      email: email,
      otp: otp,
    },
    axiosRequestConfig
  );
}

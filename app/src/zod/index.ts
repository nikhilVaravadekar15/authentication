import { z } from "zod";

const email = z.string()
    .min(1, "Required")
    .email("Invalid email address")

const password = z.string()
    .min(1, "Required")
    .min(8, "Password must be greater than 8 characters")
    .max(12, "Password must be less than 12 characters")

const fullname = z.string()
    .min(1, "Required")
    .max(64, "Fullname must be less than 64 characters")

export const emailSchema = z.object({
    email: email
})

export const passwordSchema = z.object({
    password: password
})

export const signinSchema = z.object({
    email: email,
    password: password
})

export const signupSchema = z.object({
    fullname: fullname,
    email: email,
    password: password
})

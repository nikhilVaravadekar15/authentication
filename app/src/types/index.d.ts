
export type TEmail = {
    email: string
}

export type TPassword = {
    password: string
}

export type TUsersignin = TEmail & TPassword

export type TUsersignup = TUsersignin & {
    fullname: string
}

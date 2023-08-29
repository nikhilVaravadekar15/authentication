
export type TUsersignin = {
    email: string
    password: string
}

export type TUsersignup = TUsersignin & {
    username: string
}

class UserDto {

    private username: string
    private email: string
    private password: string
    private token: string
    private refreshToken?: string

    constructor(username: string, email: string, password: string, token: string, refreshToken?: string) {
        this.username = username
        this.email = email
        this.password = password
        this.token = token
    }
}

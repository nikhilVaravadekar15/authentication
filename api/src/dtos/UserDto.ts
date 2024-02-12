class UserDto {

    private username: string
    private email: string
    private is_verified: boolean

    constructor(username: string, email: string, is_verified: boolean) {
        this.username = username
        this.email = email
        this.is_verified = is_verified
    }
}

export default UserDto;

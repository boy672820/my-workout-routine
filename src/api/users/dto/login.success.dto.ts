export interface UserDto {
    email: string
    token: string
}

export interface LoginSuccessDto {
    user: UserDto
}
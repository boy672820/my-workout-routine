export interface LoginPropsInterface {
    history: any
    setCookie: any
    setUser: any
}

export interface LoginStateInterface {
    email: string
    password: string
    valid_email: boolean
    valid_password: boolean
    valid_login: boolean
    success: boolean
}
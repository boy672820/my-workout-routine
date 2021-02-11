export interface LoginPropsInterface {
    // history: any,
    cookies: any,
    silentRefresh: any
}

export interface LoginStateInterface {
    email: string,
    valid_email: boolean,
    valid_password: boolean,
    valid_login: boolean,
    success: boolean
}
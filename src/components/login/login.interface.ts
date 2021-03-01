import { Cookies } from "react-cookie";
// import { RouteComponentProps } from "react-router";

export interface LoginPropsInterface {
    history: any
    cookies: any
    silentRefresh: ( cookies: Cookies ) => void
}

export interface LoginStateInterface {
    email: string,
    valid_email: boolean,
    valid_password: boolean,
    valid_login: boolean,
    success: boolean
}
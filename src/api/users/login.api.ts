import axios from 'axios'
import { LoginDto } from "./dto/login.dto"

export class LoginAPI {

    public static async login( userData: LoginDto ) {
        return await axios( {
            method: 'post',
            url: `${process.env.REACT_APP_REST_URI}/user/login`,
            validateStatus: status => status < 500,
            data: userData
        } )
    }

}
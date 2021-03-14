import axios, { AxiosError, AxiosResponse } from 'axios'
import { LoginDto } from "./dto/login.dto"


export class LoginAPI {

    public static async login( data: LoginDto ): Promise<AxiosResponse> {
        return await axios( {
            method: 'post',
            url: '/user/login',
            data: data
        } )
    }

    public static async getProfile(): Promise<AxiosResponse> {
        return await axios( {
            method: 'get',
            url: '/user/profile'
        } )
    }

    public static async authenticate(): Promise<AxiosResponse> {
        return await axios( {
            method: 'get',
            url: '/user/authenticate'
        } )
    }

    public static async refresh( resolve: () => void, reject: ( error: AxiosError ) => void ) {
        const JWT_EXPIRY_TIME = 15 * 3600 * 1000

        const onSilentRefresh = () => {
            this.authenticate()
                .then( onLoginSuccess )
                .catch( reject )
        }

        const onLoginSuccess = ( response: AxiosResponse ) => {
            if ( response.status === 200 ) {
                resolve()
                setTimeout( onSilentRefresh, JWT_EXPIRY_TIME )
            }
        }

        onSilentRefresh()
    }

    public static async logout() {
        await axios( {
            method: 'post',
            url: '/user/logout'
        } )
    }

}
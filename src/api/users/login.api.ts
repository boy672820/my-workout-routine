import axios, { AxiosResponse } from 'axios'
import { LoginDto } from "./dto/login.dto"


export class LoginAPI {

    public static async login( userData: LoginDto ): Promise<AxiosResponse> {
        return await axios.post( '/user/login', userData, { withCredentials: true } )
    }

    public static async getProfile() {
        return await axios( {
            method: 'get',
            url: '/user/profile'
        } )
    }

    public static async getAccessToken() {
        return await axios( {
            method: 'post',
            url: '/user/get-access-token'
        } )
    }

    public static async refresh( auth: string, email: string ) {
        const JWT_EXPIRY_TIME = 2 * 3600 * 1000

        const onSilentRefresh = () => {
            axios( {
                method: 'post',
                url: '/user/refresh',
                headers: { Authorization: `Bearer ${auth}` },
                data: { email: email }
            } )
            .then( onLoginSuccess )
            .catch( error => {
                console.log( error )
            } )
        }

        const onLoginSuccess = ( response: any ) => {
            const user = response.data.user
        
            // Set access token in memory.
            axios.defaults.headers.common[ 'Authorization' ] = `Bearer ${user.token}`

            // accessToken 만료하기 1분 전에 로그인 연장
            setTimeout( onSilentRefresh, JWT_EXPIRY_TIME - 60000 )
        }

        onSilentRefresh()
    }

}
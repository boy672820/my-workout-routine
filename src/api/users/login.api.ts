import axios, { AxiosResponse } from 'axios'
import { LoginDto } from "./dto/login.dto"


export class LoginAPI {

    public static async login( userData: LoginDto ): Promise<AxiosResponse> {
        return await axios.post( '/user/login', userData, { withCredentials: true } )
    }

    public static async getProfile() {
        // 여기서 헤더값 못받아옴..
        return await axios( {
            method: 'get',
            url: '/user/profile'
        } )
    }

    public static async getAccessToken( refresh_token: string ) {
        return await axios( {
            method: 'post',
            url: '/user/get-access-token',
            headers: { Authorization: refresh_token }
        } )
    }

    public static async refresh( email: string, setTokenCookie: any ) {
        const JWT_EXPIRY_TIME = 24 * 3600 * 1000

        const onSilentRefresh = () => {
            axios.post( '/user/refresh', { email: email } )
            .then( onLoginSuccess )
            .catch( error => {
                console.log( error )
            } )
        }

        const onLoginSuccess = ( response: any ) => {
            const user = response.data.user
        
            // Set access token in memory.
            axios.defaults.headers.common[ 'Authorization' ] = `Bearer ${user.token}`
            // Set refresh token in cookies.
            setTokenCookie( user.refresh_token )

            // accessToken 만료하기 1분 전에 로그인 연장
            setTimeout( onSilentRefresh, JWT_EXPIRY_TIME - 60000 )
        }

        onSilentRefresh()
    }

}
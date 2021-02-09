import axios, { AxiosResponse } from 'axios'
import { LoginDto } from "./dto/login.dto"

export class LoginAPI {

    public static async login( userData: LoginDto ): Promise<AxiosResponse> {
        return await axios( {
            method: 'post',
            url: '/user/login',
            data: userData
        } )
    }

    public static async getProfile() {
        return await axios( {
            method: 'get',
            url: '/user/profile'
        } )
    }

    public static async refresh( email: string ) {
        // const JWT_EXPIRY_TIME = 24 * 3600 * 1000
        const JWT_EXPIRY_TIME = 6 * 1000

        const onSilentRefresh = () => {
            axios.post( '/user/refresh', { email: email } )
            .then( onLoginSuccess )
            .catch( error => {
                console.log( error )
            } )
        }

        const onLoginSuccess = ( response: any ) => {
            const user = response.data.user
            console.log( user.token )
        
            // accessToken 설정
            // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

            // console.log( token )
        
            // accessToken 만료하기 1분 전에 로그인 연장
            // setTimeout( onSilentRefresh, JWT_EXPIRY_TIME - 60000 )
            setTimeout( onSilentRefresh, JWT_EXPIRY_TIME - 1000 )
        }

        onSilentRefresh()
    }

}
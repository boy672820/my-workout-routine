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

    public static async authenticate() {
        return await axios( {
            method: 'get',
            url: '/user/authenticate'
        } )
    }

    public static async refresh() {
        const JWT_EXPIRY_TIME = 1 * 3600 * 1000

        const onSilentRefresh = () => {
            axios( {
                method: 'post',
                url: '/user/refresh'
            } )
            .then( onLoginSuccess )
        }

        const onLoginSuccess = ( response: any ) => {
            const { user } = response.data
        
            // Set access token in memory.
            axios.defaults.headers.common[ 'Authorization' ] = `Bearer ${user.token}`

            setTimeout( onSilentRefresh, JWT_EXPIRY_TIME )
        }

        onSilentRefresh()
    }

}
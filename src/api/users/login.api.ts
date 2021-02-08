import { LoginDto } from "./dto/login.dto"
import { LoginSuccessDto } from "./dto/login.success.dto"

export class LoginAPI {

    public static async login( userData: LoginDto ): Promise<LoginSuccessDto> {
        const options = {
            method: 'POST',
            RequestCredentials: 'same-origin',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify( {
                email: userData.email,
                password: userData.password
            } )
        }
        const response = await fetch( `${process.env.REACT_APP_REST_URI}/user/login`, options )

        const data = await response.json()

        return data
    }

}
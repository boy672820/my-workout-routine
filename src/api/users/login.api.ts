import { LoginDto } from "./dto/login.dto"
import { LoginSuccessDto } from "./dto/login.success.dto"

export class LoginAPI {

    public static async login( userData: LoginDto ): Promise<LoginSuccessDto> {
        const options = {
            method: 'POST',
            body: JSON.stringify( userData )
        }
        const response = await fetch( `${process.env.REST_URI}/user/login`, options )

        const data = await response.json()

        return data
    }

}
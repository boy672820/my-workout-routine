import axios from 'axios'

import { CreateBlockDTO } from './dto/create.block.dto'


export class CreateAPI {

    public static async createBlock( data: CreateBlockDTO ) {
        return await axios( {
            method: 'post',
            url: '/routine/block',
            data: data
        } )
    }

}
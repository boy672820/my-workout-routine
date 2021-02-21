import axios from 'axios'

import { RoutineBlockDTO } from './dto/routine.block.dto'


export class RoutineAPI {

    public static async getActiveRoutine( user_email: string ) {
        const encode = encodeURIComponent( user_email )

        return await axios( {
            method: 'get',
            url: `/routine/active-routine/${encode}`
        } )
    }

    public static async createBlock( data: RoutineBlockDTO ) {
        return await axios( {
            method: 'post',
            url: '/routine/block',
            data: data
        } )
    }

    public static async nowDate() {
        return await axios( {
            method: 'get',
            url: '/routine/now-date'
        } )
    }

}
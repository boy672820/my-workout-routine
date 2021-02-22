import axios, { AxiosResponse } from 'axios'

import { RoutineBlockDTO } from './dto/routine.block.dto'


export class RoutineAPI {

    public static async getActiveRoutine( user_email: string ): Promise<AxiosResponse> {
        const encode = encodeURIComponent( user_email )

        return await axios( {
            method: 'get',
            url: `/routine/active-routine/${encode}`
        } )
    }

    public static async getRoutineDates( routine_id: number ): Promise<AxiosResponse> {
        return await axios( {
            method: 'get',
            url: `/routine/dates/${routine_id}`
        } )
    }

    public static async createBlock( data: RoutineBlockDTO ): Promise<AxiosResponse> {
        return await axios( {
            method: 'post',
            url: '/routine/block',
            data: data
        } )
    }

    public static async nowDate(): Promise<AxiosResponse> {
        return await axios( {
            method: 'get',
            url: '/routine/now-date'
        } )
    }

}
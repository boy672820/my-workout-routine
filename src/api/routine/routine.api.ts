import axios, { AxiosResponse } from 'axios'

import { RoutineBlockDTO } from './dto/routine.block.dto'
import { RoutineExerciseDTO } from './dto/routine.exercise.dto'
import { RoutineUpdateSetDTO } from './dto/routine.update.set.dto'


export class RoutineAPI {

    /** Exercises */

    public static async getExercises( block_id: number ): Promise<AxiosResponse> {
        const encode = encodeURIComponent( block_id )
        return await axios( {
            method: 'get',
            url: `/routine/exercises/${encode}`
        } )
    }

    public static async createExercise( data: RoutineExerciseDTO ) {
        return await axios( {
            method: 'post',
            url: '/routine/exercise',
            data: data
        } )
    }

    public static async removeExercise( exercise_id: number ) {
        const encode = encodeURIComponent( exercise_id )
        return await axios( {
            method: 'delete',
            url: `/routine/exercise/${encode}`
        } )
    }

    public static async updateExerciseSet( data: RoutineUpdateSetDTO ) {
        return await axios( {
            method: 'put',
            url: '/routine/exercise/set',
            data: data
        } )
    }


    /** Routines */

    public static async getActiveRoutine( user_email: string ): Promise<AxiosResponse> {
        const encode = encodeURIComponent( user_email )

        return await axios( {
            method: 'get',
            url: `/routine/active-routine/${encode}`
        } )
    }


    /** Routine_dates */

    public static async getRoutineDates( routine_id: number ): Promise<AxiosResponse> {
        return await axios( {
            method: 'get',
            url: `/routine/dates/${routine_id}`
        } )
    }


    /** Blocks */

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
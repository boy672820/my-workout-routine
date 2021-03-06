import axios, { AxiosResponse } from 'axios'

import { RoutineBlockDTO } from './dto/routine.block.dto'
import { RoutineCreateSetDTO } from './dto/routine.create.set.dto'
import { RoutineExerciseDTO } from './dto/routine.exercise.dto'
import { RoutineUpdateSetDTO } from './dto/routine.update.set.dto'
import { RoutineUpdateExerciseDTO } from './dto/routine.update.exercise.dto'
import { RoutineUpdateBlockDTO } from './dto/routine.update.block.dto'


export class RoutineAPI {

    /** Exercises */

    public static async getExercises( block_id: number ): Promise<AxiosResponse> {
        const encode = encodeURIComponent( block_id )
        return await axios( {
            method: 'get',
            url: `/routine/exercises/${encode}`
        } )
    }

    public static async createExercise( data: RoutineExerciseDTO ): Promise<AxiosResponse> {
        return await axios( {
            method: 'post',
            url: '/routine/exercise',
            data: data
        } )
    }

    public static async updateExercise( data: RoutineUpdateExerciseDTO ) {
        return await axios( {
            method: 'put',
            url: '/routine/exercise',
            data: data
        } )
    }

    public static async removeExercise( exercise_id: number ): Promise<AxiosResponse> {
        const encode = encodeURIComponent( exercise_id )
        return await axios( {
            method: 'delete',
            url: `/routine/exercise/${encode}`
        } )
    }


    /** Sets */

    public static async createExerciseSet( data: RoutineCreateSetDTO ): Promise<AxiosResponse> {
        return await axios( {
            method: 'post',
            url: '/routine/exercise/set',
            data: data
        } )
    }

    public static async updateExerciseSet( data: RoutineUpdateSetDTO ): Promise<AxiosResponse> {
        return await axios( {
            method: 'put',
            url: '/routine/exercise/set',
            data: data
        } )
    }

    public static async removeSetAndReorder( id: number, exercise_id: number, block_id: number ): Promise<AxiosResponse> {
        return await axios( {
            method: 'delete',
            url: `/routine/exercise/set-reorder`,
            data: {
                id: id,
                exercise_id: exercise_id,
                block_id: block_id
            }
        } )
    }

    public static async updateOrderSetNumber( exercise_id: number ): Promise<AxiosResponse> {
        return await axios( {
            method: 'put',
            url: `/routine/exercise/order-set/${exercise_id}`
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

    public static async getBlock( block_id: number ): Promise<AxiosResponse> {
        return await axios( {
            method: 'get',
            url: `/routine/block/${block_id}`
        } )
    }

    public static async createBlock( data: RoutineBlockDTO ): Promise<AxiosResponse> {
        return await axios( {
            method: 'post',
            url: '/routine/block',
            data: data
        } )
    }

    public static async updateBlock( data: RoutineUpdateBlockDTO ): Promise<AxiosResponse> {
        return await axios( {
            method: 'put',
            url: '/routine/block',
            data: data
        } )
    }

    public static async removeBlock( block_id: number ): Promise<AxiosResponse> {
        return await axios( {
            method: 'delete',
            url: `/routine/block/${block_id}`
        } )
    }


    // Utilities

    public static async nowDate(): Promise<AxiosResponse> {
        return await axios( {
            method: 'get',
            url: '/routine/now-date'
        } )
    }

}
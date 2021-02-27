interface CreateObjectKeys {

    [ key: string ]: string | number | boolean | object[] | null | CreateExerciseSetInterface

}

export interface CreateExerciseSetInterface {

    ID: number
    exercise_id: number
    set_disable_range: 1 | 0
    set_max_reps: number
    set_number: number
    set_reps: number
    set_rest: number
    set_rir: number
    set_weight: number

}


export interface CreateExerciseDataInterface {

    ID: number
    block_id: number
    exercise_name: string
    sets: CreateExerciseSetInterface[]

}


export interface CreateStateInterface extends CreateObjectKeys {

    // UI/UX state.
    create_modal: boolean
    weight_plate: number
    remove_exercise_modal: boolean

    // Create exercise state.
    block_id: number
    exercise_name: string
    set_number: number
    set_weight: number
    set_reps: number
    set_max_reps: number
    set_disable_range: boolean
    set_rir: number
    set_rest_minute: number
    set_rest_second: number
    
    // Edit set state.
    edit_set_modal: boolean
    edit_exercise_name: string
    edit_ID: number
    edit_exercise_id: number
    edit_set_number: number
    edit_set_reps: number
    edit_set_max_reps: number
    edit_set_disable_range: 1 | 0
    edit_set_weight: number
    edit_set_rir: number
    edit_set_rest_minute: number
    edit_set_rest_second: number

    // Remove state.
    remove_exercise_name: string
    remove_exercise_id: number | null

    // Getting state.
    exerciseData: CreateExerciseDataInterface[]
    
}


export interface CreatePropsInterface {

    history: any
    match: any

}

interface CreateObjectKeys {
    [ key: string ]: string | number | boolean | object[]
}

interface CreateExerciseSetInterface {
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
    // UI/UX data.
    create_modal: boolean
    weight_plate: number

    // Getting data.
    exerciseData: CreateExerciseDataInterface[]

    // Using form data.
    block_id: number
    exercise_name: string
    set_number: number
    weight: number
    reps: number
    max_reps: number
    disable_range: boolean
    rir: number
    rest_minute: number
    rest_second: number
}

export interface CreatePropsInterface {
    history: any
    match: any
}

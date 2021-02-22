interface CreateObjectKeys {
    [ key: string ]: string | number | boolean | object[]
}

export interface CreateExerciseDataInterface {
    ID: number
    block_id: number
    exercise_name: string
}

export interface CreateStateInterface extends CreateObjectKeys {
    block_id: number
    create_modal: boolean
    exercise_name: string
    set_number: number
    weight: number
    reps: number
    max_reps: number
    disable_range: boolean
    rir: number
    rest: number
    weight_plate: number
    exerciseData: CreateExerciseDataInterface[]
}

export interface CreatePropsInterface {
    history: any
    match: any
}

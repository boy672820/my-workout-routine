interface CreateObjectKeys {
    [ key: string ]: string | number | boolean
}

export interface CreateStateInterface extends CreateObjectKeys {
    block_id: number
    exercise_name: string
    set_number: number
    weight: number
    reps: number
    max_reps: number
    disable_range: boolean
    rir: number
    rest: number
    weight_plate: number
}

export interface CreatePropsInterface {
    history: any
    match: any
}

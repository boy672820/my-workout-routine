export interface CalendarPropsInterface {
    history: any
}

interface CalendarNowDateInterface {
    year: number,
    month: number,
    date: number
}

export interface CalendarStateInterface {
    modal: boolean
    modal_title: string
    routine_id: null | number
    routine_date: string
    block_title: string
    nowDate: CalendarNowDateInterface
    blocks: { [ key: string ]: any }
}

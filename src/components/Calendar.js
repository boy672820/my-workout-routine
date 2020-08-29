import React, {Component} from 'react'
import './calendar.css'

const init = {
    month: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
    day: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
    today: new Date()
}

const Month = () => {
    return (
        <h1 className="month">
            {init.month[ init.today.getMonth() ]}
        </h1>
    )
}

const TableHeader = () => {
    return (
        <thead className="week">
            <tr>
                {
                    init.day.map(
                        ( item ) => {
                            return <td>{item}</td>
                        }
                    )
                }
            </tr>
        </thead>
    )
}

const CalendarDays = ( props ) => {
    return (
        props.items.map(
            ( item ) => {
                return <td>{item === 0 ? '' : item}</td>
            }
        )
    )
}

const CalendarWeeks = ( props ) => {
    return (
        props.rows.map(
            ( row ) => {
                return (
                    <tr>
                        <CalendarDays items={row} />
                    </tr>
                )
            }
        )
    )
}

const TableBody = () => {

    let first_day = new Date( init.today.getFullYear(), init.today.getMonth(), 1 ),
        last_day = new Date( init.today.getFullYear(), init.today.getMonth(), 0 )

    const calendarData = [ new Array() ]

    // Push first week to calendarData.
    for ( let i = 0, first_week_item = 1; i <= 6; i += 1 ) {
        if ( first_day.getDay() <= i ) {

            calendarData[ 0 ].push( first_week_item )

            first_week_item += 1
        }
        else calendarData[ 0 ].push( 0 )
    }

    

    const rows = [
        [0, 0, 0, 0, 0, 0, 1],
        [2, 3, 4, 5, 6, 7, 8],
        [9, 10, 11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20, 21, 22],
        [23, 24, 25, 26, 27, 28, 29],
        [30, 31, 0, 0, 0, 0, 0],
    ]

    return (
        <tbody className="days">
            {calendarData}
            <CalendarWeeks rows={rows} />
        </tbody>
    )
}

const Calendar = () => {
    return (

        <div className="calendar_wrap">

            <Month />

            <table className="calendar">

                <TableHeader />
                <TableBody />

            </table>

        </div>

    )
}

export default Calendar
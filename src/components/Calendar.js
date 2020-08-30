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
                        ( item, index ) => {
                            return <td key={index}>{item}</td>
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
            ( item, index ) => {
                return <td key={index}>{item === 0 ? '' : item}</td>
            }
        )
    )
}

const CalendarWeeks = ( props ) => {
    return (
        props.rows.map(
            ( row, index ) => {
                return (
                    <tr key={index}>
                        <CalendarDays items={row} />
                    </tr>
                )
            }
        )
    )
}

const TableBody = () => {

    const calendarData = []

    let firstDate = new Date( init.today.getFullYear(), init.today.getMonth(), 1 ),
        lastDate = new Date( init.today.getFullYear(), init.today.getMonth() + 1, 0 )

    let calendar_total_date = firstDate.getDay() + lastDate.getDate()

    calendar_total_date = calendar_total_date / 7
    calendar_total_date = Math.ceil( calendar_total_date )

    for ( let i = 0; i < calendar_total_date; i += 1 ) {
        calendarData.push( new Array() )
    }

    // Push first week to calendarData.
    for ( let i = 0, first_week_date = 1; i <= 6; i += 1 ) {
        if ( firstDate.getDay() <= i ) {

            calendarData[ 0 ].push( first_week_date )

            first_week_date += 1
        }
        else calendarData[ 0 ].push( 0 )
    }

    // Push date of week to calendarData.
    for ( let i = 1; i < calendar_total_date - 1; i += 1 ) {

        let first_date_of_week = calendarData[ i - 1 ][ 6 ] + 1;
        
        for ( let j = first_date_of_week; j <= first_date_of_week + 6; j += 1 )
            calendarData[ i ].push( j );
    }

    // Push date of last week to calendarData.
    let first_date_of_last_week = lastDate.getDate() - lastDate.getDay()

    for ( let i = first_date_of_last_week; i <= lastDate.getDate(); i += 1 ) {
        calendarData[ calendar_total_date - 1 ].push( i )
    }

    return (
        <tbody className="days">
            <CalendarWeeks rows={calendarData} />
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
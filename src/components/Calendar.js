import React, {Component} from 'react'
import './calendar.css'


const Month = () => {
    return (
        <h1 className="month">7월</h1>
    )
}

const TableHeader = () => {
    return (
        <thead className="week">
            <tr>
                <td className="sunday">일</td>
                <td>월</td>
                <td>화</td>
                <td>수</td>
                <td>목</td>
                <td>금</td>
                <td className="saturday">토</td>
            </tr>
        </thead>
    )
}

const TableBody = () => {
    const init = {
        month: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
        day: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
        today: new Date()
    }

    let rows = [],
        i = 1;

    for ( i; i <= init.today.getDate(); i += 1 ) {
        let last_week = 7;

        if ( i === last_week ) {
        }
    }

    return (
        <tbody className="days">
            {rows}
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
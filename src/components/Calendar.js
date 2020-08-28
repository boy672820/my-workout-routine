import React, {Component} from 'react'
import './calendar.css'


const init = {
    month: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
    day: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
    today: new Date()
}


const Month = () => {
    return (
        <h1 className="month">{init.today.getMonth() + 1}월</h1>
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

    // let rows = [],
    //     new Date( init.today.getUTCFullYear(), init.today.getUTCMonth(), 1 ).getDay() - 1,
    //     total_date = new Date( init.today.getUTCFullYear(), init.today.getUTCMonth(), 0 ).getUTCDate() + 1

    // for ( i; i <= total_date; i += 1, loop_count += 1 ) {
    // }

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
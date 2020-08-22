import React, {Component} from 'react'
import './stylesheets/calendar.css'

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
    return (
        <tbody className="days">
            <tr>
                <td className="day sunday">1</td>
                <td className="day">2</td>
                <td className="day">3</td>
                <td className="day">4</td>
                <td className="day">5</td>
                <td className="day">6</td>
                <td className="day saturday">7</td>
            </tr>
            <tr>
                <td className="day sunday">8</td>
                <td className="day">9</td>
                <td className="day">10</td>
                <td className="day">11</td>
                <td className="day">12</td>
                <td className="day">13</td>
                <td className="day saturday">14</td>
            </tr>
            <tr>
                <td className="day sunday">15</td>
                <td className="day">16</td>
                <td className="day">17</td>
                <td className="day">18</td>
                <td className="day">19</td>
                <td className="day">20</td>
                <td className="day saturday">21</td>
            </tr>
            <tr>
                <td className="day sunday">22</td>
                <td className="day">23</td>
                <td className="day">24</td>
                <td className="day">25</td>
                <td className="day">26</td>
                <td className="day">27</td>
                <td className="day saturday">28</td>
            </tr>
            <tr>
                <td className="day sunday">29</td>
                <td className="day">30</td>
                <td className="day">31</td>
            </tr>
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
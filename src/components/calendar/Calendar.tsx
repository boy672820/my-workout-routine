import React, { Component } from 'react'
import {
    Container,
    Table,
    Form
} from 'react-bootstrap'

import { CalendarPropsInterface, CalendarStateInterface } from './calendar.interface'

import './calendar.css'


class Calendar extends Component<CalendarPropsInterface, CalendarStateInterface> {

    constructor( props: CalendarPropsInterface ) {
        super( props )

        this.state = {

        }
    }

    handleClick() {
    }

    render() {
        return (
            <main className="main">
                <Container>
                    <h3>2021년 2월</h3>

                    <Table className="calendar-table">
                        <thead>
                            <tr>
                                <th className="text align center">날짜</th>
                                <th className="text align left">운동</th>
                                <th className="text align center">완료</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text align center" width="60">1</td>
                                <td className="text align left"><a href="/calendar" onClick={this.handleClick}>스쿼트 / 데드리프트 / 덤벨 컬 / 클로즈그립 벤치프레스</a></td>
                                <td className="text align center" width="60"><Form.Check type="checkbox" /></td>
                            </tr>
                            <tr>
                                <td className="text align center" width="60">2</td>
                                <td className="text align left"><a href="/calendar" onClick={this.handleClick}>기록을 남겨주세요.</a></td>
                                <td className="text align center" width="60"><Form.Check type="checkbox" /></td>
                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </main>
        )
    }

}

export default Calendar
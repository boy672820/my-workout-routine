import React, { Component } from 'react'
import {
    Container,
    Table,
    Card,
    Button
} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBurn, faEdit } from "@fortawesome/free-solid-svg-icons"

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

                    <header className="calendar-header">
                        <h3>2021년 2월</h3>
                    </header>

                    <Card>
                        <Card.Body className="no padding">
                            <Table className="no margin">
                                <thead>
                                    <tr>
                                        <th className="text align center">날짜</th>
                                        <th>내용</th>
                                        <th className="text align center">기록</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="vertical text align middle center">1(월)</td>
                                        <td className="vertical align middle"><FontAwesomeIcon icon={ faBurn } style={ { color: '#dc3545' } } />&nbsp;캔디토 상체 컨트롤데이</td>
                                        <td className="vertical text align middle center">
                                            <Button variant="link" className="no padding">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="vertical text align middle center">2(화)</td>
                                        <td className="vertical align middle"><FontAwesomeIcon icon={ faBurn } />&nbsp;캔디토 하체 컨트롤데이</td>
                                        <td className="vertical text align middle center">
                                            <Button variant="link" className="no padding">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="vertical text align middle center">3(수)</td>
                                        <td className="vertical align middle"><FontAwesomeIcon icon={ faBurn } />&nbsp;캔디토 하체 컨트롤데이</td>
                                        <td className="vertical text align middle center">
                                            <Button variant="link" className="no padding">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="vertical text align middle center">4(목)</td>
                                        <td className="vertical align middle"><FontAwesomeIcon icon={ faBurn } />&nbsp;캔디토 하체 컨트롤데이</td>
                                        <td className="vertical text align middle center">
                                            <Button variant="link" className="no padding">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="vertical text align middle center">5(금)</td>
                                        <td className="vertical align middle"><FontAwesomeIcon icon={ faBurn } />&nbsp;캔디토 하체 컨트롤데이</td>
                                        <td className="vertical text align middle center">
                                            <Button variant="link" className="no padding">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="vertical text align middle center">6(토)</td>
                                        <td className="vertical align middle"><FontAwesomeIcon icon={ faBurn } />&nbsp;캔디토 하체 컨트롤데이</td>
                                        <td className="vertical text align middle center">
                                            <Button variant="link" className="no padding">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="vertical text align middle center">7(일)</td>
                                        <td className="vertical align middle"><FontAwesomeIcon icon={ faBurn } />&nbsp;캔디토 하체 컨트롤데이</td>
                                        <td className="vertical text align middle center">
                                            <Button variant="link" className="no padding">
                                                <FontAwesomeIcon icon={ faEdit } />
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>

                </Container>
            </main>
        )
    }

}

export default Calendar
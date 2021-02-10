import React, { Component } from 'react'
import {
    Container
} from 'react-bootstrap'

import { LoginAPI } from '../../api/users/login.api'
import { CalendarPropsInterface, CalendarStateInterface } from './calendar.interface'


class Calendar extends Component<CalendarPropsInterface, CalendarStateInterface> {

    constructor( props: CalendarPropsInterface ) {
        super( props )

        this.state = {

        }
    }

    componentDidMount() {
        LoginAPI.getProfile().then( response => {
            LoginAPI.refresh( response.data.email )
        } )
    }

    render() {
        return (
            <main>
                <Container>
                    <h3>Calendar</h3>


                </Container>
            </main>
        )
    }

}

export default Calendar
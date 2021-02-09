import React, { Component } from 'react'
import {
    Container
} from 'react-bootstrap'
import axios from 'axios'

import { CalendarPropsInterface, CalendarStateInterface } from './calendar.interface'
import { LoginAPI } from '../../api/users/login.api'


class Calendar extends Component<CalendarPropsInterface, CalendarStateInterface> {

    constructor( props: CalendarPropsInterface ) {
        super( props )

        this.state = {

        }
    }

    componentDidMount() {
        if ( axios.defaults.headers.common.Authorization ) {
            LoginAPI.getProfile().then( response => {
                LoginAPI.refresh( response.data.email )
            } )
        }
        else {
            this.props.history.push( '/login' )
        }
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
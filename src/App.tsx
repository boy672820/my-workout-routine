import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie'

import { LoginAPI } from './api/users/login.api'
import Calendar from './components/calendar/Calendar'
import Login from './components/login/Login'
import Records from './components/records/Records'


interface AppPropsInterface {
    cookies: any
}


class App extends Component <AppPropsInterface> {

    static propTypes = {
        cookies: instanceOf( Cookies ).isRequired
    }

    componentDidMount() {
        // If token exists.
        if ( this.props.cookies.get( 'token' ) ) {
        }
    }

    /**
     * Get refresh token.
     */
    getRefreshToken() {
        LoginAPI.getProfile().then( response => {
            LoginAPI.refresh( response.data.email )
        } )
    }

    render() {
        const isLoginRedirect = ! axios.defaults.headers.common.Authorization ? <Redirect to="/login" /> : <Redirect to="/calendar" />

        return (
            <Router>
                {isLoginRedirect}
                <Route path="/calendar" component={ Calendar } />
                <Route path="/login" render={ () => <Login silentRefresh={this.getRefreshToken} /> } />
                <Route path="/records" component={ Records } />

            </Router>
        )
    }
}

export default withCookies( App )
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie'

import { LoginAPI } from './api/users/login.api'
import Calendar from './components/calendar/Calendar'
import Login from './components/login/Login'
import Records from './components/records/Records'


interface AppPropsInterface {
    cookies: Cookies
}


class App extends Component <AppPropsInterface> {

    static propTypes = {
        cookies: instanceOf( Cookies ).isRequired
    }

    constructor( props: AppPropsInterface ) {
        super( props )

        this.getRefreshToken.bind( this )
    }

    componentDidMount() {
        // If token exists.
        if ( this.props.cookies.get( 'token' ) ) {
            // Get access token when refresh token is cookie.
            const getAccessToken = LoginAPI.getAccessToken( this.props.cookies.get( 'token' ) )

            getAccessToken.then( response => {
                // Set access token in memory.
                axios.defaults.headers.common[ 'Authorization' ] = `Bearer ${response.data.user.token}`
                // Set refresh token in cookie.
                this.props.cookies.set( 'token', response.data.user.refresh_token )

                // Refresh token.
                this.getRefreshToken( this.props.cookies )
            } )
            .catch( error => {
                console.log( error )
            } )
        }
    }

    /**
     * Get refresh token.
     */
    getRefreshToken( cookies: Cookies ) {
        LoginAPI.getProfile().then( response => {
            LoginAPI.refresh(
                response.data.email,
                ( refresh_token: string ) => { cookies.set( 'token', refresh_token ) }
            )
        } )
        .catch( error => {
            console.log( 'Get Profile..', error )
        } )
    }


    render() {
        const isAuth = axios.defaults.headers.common.Authorization ? '' : <Redirect to="/login" />

        const handleLogout = () => {
            axios.defaults.headers.common[ 'Authorization' ] = ''
            const { cookies } = this.props
            cookies.remove( 'token' )
        }
    
        return (
            <Router>
                {isAuth}
                <ul>
                    <li><Link to="/calendar">Calendar</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/records">Records</Link></li>
                </ul>
                <div>
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <Route path="/calendar" component={ Calendar } />
                <Route path="/login">
                    {
                        axios.defaults.headers.common.Authorization ?
                            <Redirect to="/calendar" /> :
                            <Login cookies={this.props.cookies} silentRefresh={this.getRefreshToken} />
                    }
                </Route>
                <Route path="/records" component={ Records } />

            </Router>
        )
    }
}

export default withCookies( App )
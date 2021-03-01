import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

import { LoginAPI } from './api/users/login.api'
import Calendar from './components/calendar/Calendar'
import Login from './components/login/Login'
import Record from './components/record/Record'
import CreateExercise from './components/create/CreateExercise'
import NotFound from './components/notfound/NotFound'
import AuthRoute from './components/AuthRoute'


interface AppPropsInterface {
    cookies: Cookies
}


class App extends Component <AppPropsInterface> {

    static propTypes = {
        cookies: instanceOf( Cookies ).isRequired
    }

    constructor( props: AppPropsInterface ) {
        super( props )

        this.getRefreshToken = this.getRefreshToken.bind( this )
        this.handleLogout = this.handleLogout.bind( this )
    }

    componentDidMount() {
        // const refresh_token = this.props.cookies.get( 'token' )
        // // If token exists.
        // if ( refresh_token ) {
        //     // Get access token when refresh token is cookie.
        //     const getAccessToken = LoginAPI.getAccessToken( refresh_token )

        //     getAccessToken.then( response => {
        //         // Set access token in memory.
        //         axios.defaults.headers.common[ 'Authorization' ] = `Bearer ${response.data.user.token}`
        //         // Set refresh token in cookie.
        //         this.props.cookies.set( 'token', response.data.user.refresh_token )

        //         // Refresh token.
        //         this.getRefreshToken( this.props.cookies )
        //     } )
        //     .catch( error => {
        //         console.log( error )
        //     } )
        // }
    }

    /**
     * Get refresh token.
     */
    async getRefreshToken( cookies: Cookies ) {
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

    async handleLogout() {
        axios.defaults.headers.common[ 'Authorization' ] = ''
        const { cookies } = this.props
        cookies.remove( 'token' )
    }


    render() {
        return (
            <Router>
                <Switch>

                    <Route path="/login" render={ ( props ) => <Login cookies={this.props.cookies} silentRefresh={this.getRefreshToken} history={ props.history } /> } />

                    <AuthRoute path="/calendar" component={ Calendar } cookies={ this.props.cookies } />

                    <AuthRoute path="/create/exercise/:block_id" component={ CreateExercise } cookies={ this.props.cookies } />

                    <AuthRoute path="/record" component={ Record } cookies={ this.props.cookies } />

                    <Route component={ NotFound } />

                </Switch>
            </Router>
        )
    }
}

export default withCookies( App )
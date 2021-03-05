import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

import AuthRoute from './components/AuthRoute'
import Calendar from './components/calendar/Calendar'
import Login from './components/login/Login'
import Record from './components/record/Record'
import CreateExercise from './components/create/CreateExercise'
import NotFound from './components/notfound/NotFound'
import axios from 'axios'
import { LoginAPI } from './api/users/login.api'


interface AppPropsInterface {
    cookies: Cookies
}
interface AppStateInterface {
    auth: boolean
}


class App extends Component <AppPropsInterface, AppStateInterface> {

    static propTypes = {
        cookies: instanceOf( Cookies ).isRequired
    }

    constructor( props: AppPropsInterface ) {
        super( props )

        this.state = {
            auth: false
        }

        this.signIn = this.signIn.bind( this )

    }

    componentDidMount() {
        // this.signIn()
    }

    async signIn() {
        const token = this.props.cookies.get( 'token' )

        if ( ! token ) return

        LoginAPI.getAccessToken( token ).then( response => {
            const { user } = response.data

            if ( ! user ) return

            axios.defaults.headers.common.Authorization = `Bearer ${user.token}`
            this.props.cookies.set( 'token', user.refresh_token )
            this.setState( { auth: true } )

            // Silent refresh token.
            LoginAPI.refresh(
                user.email,
                ( refresh_token: string ) => {
                    this.props.cookies.set( 'token', refresh_token )
                }
            )
        } )
    }

    render() {
        console.log( axios.defaults.headers.common.Authorization )
        return (
            <Router>
                <Switch>
                    <Route path="/login" render={ ( props ) => <Login cookies={ this.props.cookies } history={ props.history } /> } />

                    <AuthRoute router="/" component={ Calendar } cookies={ this.props.cookies } exact={ true } signIn={ this.signIn } />

                    <AuthRoute router="/create/exercise/:block_id" component={ CreateExercise } cookies={ this.props.cookies } signIn={ this.signIn } />

                    <AuthRoute router="/record" component={ Record } cookies={ this.props.cookies } signIn={ this.signIn } />

                    <Route component={ NotFound } />
                </Switch>
            </Router>
        )
    }
}

export default withCookies( App )
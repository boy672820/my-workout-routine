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
import { LoginAPI } from './api/users/login.api'
import axios from 'axios'


interface AppPropsInterface {
    cookies: Cookies
}
interface AppStateInterface {
    is_auth: boolean
}


class App extends Component <AppPropsInterface, AppStateInterface> {

    static propTypes = {
        cookies: instanceOf( Cookies ).isRequired
    }

    constructor( props: AppPropsInterface ) {
        super( props )

        const auth = axios.defaults.headers.common.Authorization

        this.state = {
            is_auth: auth ? true : false
        }

        this.signInUser = this.signInUser.bind( this )
    }

    componentDidMount() {
        this.signInUser()
    }

    async signInUser() {
        const refresh_token = this.props.cookies.get( 'token' )

        if ( refresh_token ) {

            const promise = new Promise( ( resolve, reject ) => {
                LoginAPI.getAccessToken( refresh_token )
                .then( response => {
                    if ( response.data.user ) {
                        resolve( response )
                    }
                } )
                .catch( error => {
                    reject( error )
                } )
            } )

            await promise.then( ( response: any )  => {
                axios.defaults.headers.common[ 'Authorization' ] = `Bearer ${response.data.user.token}`
                this.props.cookies.set( 'token', response.data.user.refresh_token )

                LoginAPI.refresh(
                    response.data.user.email,
                    ( refresh_token: string ) => {
                        this.props.cookies.set( 'token', refresh_token )
                    }
                )
            } )
            .catch( ( error ) => {
                this.setState( { is_auth: false } )
            } )

        }
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" render={ ( props ) => <Login cookies={ this.props.cookies } history={ props.history } /> } />

                    <AuthRoute router="/" component={ Calendar } cookies={ this.props.cookies } exact={ true } is_auth={ this.state.is_auth } />

                    <AuthRoute router="/create/exercise/:block_id" component={ CreateExercise } cookies={ this.props.cookies } is_auth={ this.state.is_auth } />

                    <AuthRoute router="/record" component={ Record } cookies={ this.props.cookies } is_auth={ this.state.is_auth } />

                    <Route component={ NotFound } />
                </Switch>
            </Router>
        )
    }
}

export default withCookies( App )
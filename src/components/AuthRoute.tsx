import React, { Component } from 'react'
import { instanceOf } from 'prop-types'
import { Cookies } from 'react-cookie'
import { Redirect, Route } from 'react-router'
import { LoginAPI } from '../api/users/login.api'
import axios from 'axios'

interface AuthRoutePropsInterface {
    path: string
    component: any,
    cookies: Cookies
}
interface AuthRouteStateInterface {}

class AuthRoute extends Component<AuthRoutePropsInterface,AuthRouteStateInterface > {

    static propTypes = {
        cookies: instanceOf( Cookies ).isRequired
    }

    constructor( props: AuthRoutePropsInterface ) {
        super( props )

        this.state = {}

        this.getRefreshToken = this.getRefreshToken.bind( this )
    }

    componentDidMount() {

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

    render() {
        const { path, component: Component } = this.props

        const refresh_token = this.props.cookies.get( 'token' )

        // If token exists.
        if ( refresh_token ) {
            // Get access token when refresh token is cookie.
            const getAccessToken = LoginAPI.getAccessToken( refresh_token )

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

        const auth = axios.defaults.headers.common[ 'Authorization' ]

        console.log( auth )

        return (
            <Route
                path={ path }
                render={
                    ( props ) => auth ?
                        <Component { ...props } /> :
                        <Redirect to={ { pathname: '/login', state: { from: props.location } } } />
                }
            />
        )
    }
}

export default AuthRoute
import React, { Component } from 'react'
import { instanceOf } from 'prop-types'
import { Cookies } from 'react-cookie'
import {
    Route,
    Redirect
} from 'react-router'
import { LoginAPI } from '../api/users/login.api'
import axios from 'axios'


interface AuthRoutePropsInterface {
    cookies: Cookies
    path: string
    component: any
    exact?: boolean
}
interface AuthRouteStateInterface {
    is_auth: boolean
}


class AuthRoute extends Component<AuthRoutePropsInterface, AuthRouteStateInterface> {

    static propTypes = {
        cookies: instanceOf( Cookies ).isRequired
    }

    constructor( props: AuthRoutePropsInterface ) {
        super( props )

        const refresh_token = props.cookies.get( 'token' )

        this.state = { is_auth: refresh_token ? true : false }
    }

    componentDidMount() {
        const refresh_token = this.props.cookies.get( 'token' )

        if ( refresh_token ) {
            const response = LoginAPI.getAccessToken( refresh_token )

            response.then( response => {
                if ( response.data.user ) {
                    axios.defaults.headers.common[ 'Authorization' ] = `Bearer ${response.data.user.token}`
                    this.props.cookies.set( 'token', response.data.user.refresh_token )

                    LoginAPI.refresh(
                        response.data.user.email,
                        ( refresh_token: string ) => {
                            this.props.cookies.set( 'token', refresh_token )
                        }
                    )
                }
            } )
            .catch( error => {
                console.log( error )
                this.setState( { is_auth: false } )
            } )
        }
    }

    render() {
        const {
            path,
            exact,
            component: Component
        } = this.props

        return (
            <Route
                exact={ exact ? true : false }
                path={ path }
                render={
                    ( props ) => this.state.is_auth ?
                        <Component { ...props } /> :
                        <Redirect to={ { pathname: '/login', state: { from: props.location } } } />
                }
            />
        )
    }
}

export default AuthRoute
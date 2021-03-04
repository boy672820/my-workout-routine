import React, { Component } from 'react'
import { instanceOf } from 'prop-types'
import { Cookies } from 'react-cookie'
import {
    Route,
    Redirect
} from 'react-router'


interface AuthRoutePropsInterface {
    cookies: Cookies
    router: string
    component: any
    exact?: boolean
    is_auth: boolean
}
interface AuthRouteStateInterface {}

class AuthRoute extends Component<AuthRoutePropsInterface, AuthRouteStateInterface> {

    static propTypes = {
        cookies: instanceOf( Cookies ).isRequired
    }

    constructor( props: AuthRoutePropsInterface ) {
        super( props )

        // const refresh_token = props.cookies.get( 'token' )

        this.state = {}

        // this.signInUser = this.signInUser.bind( this )
    }

    // componentDidMount() {
    //     if ( ! axios.defaults.headers.common.Authorization )
    //         this.signInUser()
    // }

    // async signInUser() {
    //     const refresh_token = this.props.cookies.get( 'token' )

    //     if ( refresh_token ) {

    //         const promise = new Promise( ( resolve, reject ) => {
    //             LoginAPI.getAccessToken( refresh_token )
    //             .then( response => {
    //                 if ( response.data.user ) {
    //                     resolve( response )
    //                 }
    //             } )
    //             .catch( error => {
    //                 reject( error )
    //             } )
    //         } )

    //         await promise.then( ( response: any )  => {
    //             axios.defaults.headers.common[ 'Authorization' ] = `Bearer ${response.data.user.token}`
    //             this.props.cookies.set( 'token', response.data.user.refresh_token )

    //             LoginAPI.refresh(
    //                 response.data.user.email,
    //                 ( refresh_token: string ) => {
    //                     this.props.cookies.set( 'token', refresh_token )
    //                 }
    //             )
    //         } )
    //         .catch( ( error ) => {
    //             this.setState( { is_auth: false } )
    //         } )

    //     }
    // }

    render() {
        const { is_auth, router, exact, component: Component } = this.props

        return (
            <Route
                exact={ exact ? true : false }
                path={ router }
                render={
                    ( props ) => is_auth ?
                        <Component { ...props } /> :
                        <Redirect to={ { pathname: '/login', state: { from: props.location } } } />
                }
            />
        )
    }
}

export default AuthRoute
import React, { Component } from 'react'
import { Route } from 'react-router'
import Unauthorized from './unauthorized/Unauthorized'


interface AuthRoutePropsInterface {
    path: string
    component: any
    exact?: boolean
    auth: number
}
interface AuthRouteStateInterface {}


class AuthRoute extends Component<AuthRoutePropsInterface, AuthRouteStateInterface> {

    constructor( props: AuthRoutePropsInterface ) {
        super( props )

        this.state = {}
    }

    render() {
        const { exact, path, component: Component, auth } = this.props

        return (
            <Route
                exact={ exact ? true : false }
                path={ path }
                render={
                    ( props ) => auth ?
                        <Component { ...props } /> :
                        <Unauthorized auth={ auth } />
                }
            />
        )
    }
}

export default AuthRoute
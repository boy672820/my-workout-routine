import React, { Component } from 'react'
import { Redirect, Route } from 'react-router'


interface AuthRoutePropsInterface {
    path: string
    component: any
    auth: number
    exact?: boolean
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
                        <Redirect to={ { pathname: '/login', state: props.location } } />
                }
            />
        )
    }
}

export default AuthRoute
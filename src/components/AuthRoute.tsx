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
    signIn: () => void
}
interface AuthRouteStateInterface {
    auth: boolean
}

class AuthRoute extends Component<AuthRoutePropsInterface, AuthRouteStateInterface> {

    static propTypes = {
        cookies: instanceOf( Cookies ).isRequired
    }

    constructor( props: AuthRoutePropsInterface ) {
        super( props )

        this.state = {
            auth: false
        }
    }

    componentDidMount() {
    }

    render() {
        const { router, exact, component: Component } = this.props

        return (
            <Route
                exact={ exact ? true : false }
                path={ router }
                render={
                    ( props ) => this.state.auth ?
                        <Component { ...props } auth={ this.state.auth } /> :
                        <Redirect to={ { pathname: '/login', state: { from: props.location } } } />
                }
            />
        )
    }
}

export default AuthRoute
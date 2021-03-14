import React from 'react'
import { Redirect, Route } from 'react-router'
import { useStoreState } from '../store'


interface AuthRoutePropsInterface {
    path: string
    render: ( props: any ) => React.ReactNode
    exact?: boolean
}


export default function AuthRoute( { exact, path, render }: AuthRoutePropsInterface ) {

    const { user } = useStoreState()
    
    return (
        <Route
            exact={ exact ? true : false }
            path={ path }
            render={
                props => user ?
                    render( props ) :
                    <Redirect to={ { pathname: '/login', state: { from: props.location } } } />
            }
        />
    )
}
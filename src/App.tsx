import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useCookies } from "react-cookie"
import axios from 'axios'

import AuthRoute from './components/AuthRoute'
import Calendar from './components/calendar/Calendar'
import Login from './components/login/Login'
import Record from './components/record/Record'
import CreateExercise from './components/create/CreateExercise'
import NotFound from './components/notfound/NotFound'
import Navigation from './components/layout/Navigation'
import { LoginAPI } from './api/users/login.api'
import Routine from './components/routine/Routine'


function App() {
    const [ cookies, setCookie ] = useCookies( [ 'token' ] )
    const [ user, setUser ] = useState( 0 )

    useEffect( () => {
        const { token } = cookies

        if ( token ) {
            LoginAPI.getAccessToken( token ).then( response => {
                const { user } = response.data

                axios.defaults.headers.common.Authorization = `Bearer ${user.token}` // Set auth to axios defaults headers.
                setCookie( 'token', user.refresh_token, { path: '/' } ) // Set token cookie.
                setUser( 1 ) // Set active user status.

                // Refresh token.
                LoginAPI.refresh(
                    user.token,
                    user.email,
                    ( refresh_token: string ) => {
                        setCookie( 'token', refresh_token, { path: '/' } )
                    }
                )
            } )
        }
    } )

    return (
        <>
            <div className="mwr-content">
                <Router>
                    <Switch>
                        <Route
                            path="/login"
                            render={
                                props => <Login setCookie={ setCookie } setUser={ setUser } history={ props.history } />
                            }
                        />

                        <AuthRoute
                            path="/"
                            component={ Calendar }
                            exact={ true }
                            auth={ user }
                        />

                        <AuthRoute
                            path="/create/exercise/:block_id"
                            component={ CreateExercise }
                            auth={ user }
                        />

                        <AuthRoute
                            path="/record/:block_id"
                            component={ Record }
                            auth={ user }
                        />

                        <AuthRoute
                            path="/routine"
                            component={ Routine }
                            auth={ user }
                        />

                        <Route component={ NotFound } />
                    </Switch>

                    {/** Layout navigation */}
                    <Navigation user={ user } setUser={ setUser } />
                </Router>
            </div>
        </>
    )
}

export default App
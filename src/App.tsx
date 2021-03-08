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
import { LoginAPI } from './api/users/login.api'
import Navigation from './components/layout/Navigation'


function App() {
    const [ cookies, setCookie ] = useCookies( [ 'token' ] )
    const [ user, setUser ] = useState( 0 )

    useEffect( () => {
        const { token } = cookies

        if ( token ) {
            LoginAPI.getAccessToken( token ).then( response => {
                const { user } = response.data

                axios.defaults.headers.common.Authorization = `Bearer ${user.token}`
                setCookie( 'token', user.refresh_token, { path: '/' } )
                setUser( 1 )

                // Refresh token.
                LoginAPI.refresh(
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
                        <Route path="/login" render={ ( props ) => <Login setCookie={ setCookie } setUser={ setUser } history={ props.history } /> } />

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
                            path="/record"
                            component={ Record }
                            auth={ user }
                        />

                        <Route component={ NotFound } />
                    </Switch>
                </Router>
            </div>

            {/** Layout navigation */}
            <Navigation />
        </>
    )
}

export default App
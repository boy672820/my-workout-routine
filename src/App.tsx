import React from 'react'
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom'

import AuthRoute from './components/AuthRoute'
import Calendar from './components/calendar/Calendar'
import Login from './components/login/Login'
import Record from './components/record/Record'
import CreateExercise from './components/create/CreateExercise'
import NotFound from './components/notfound/NotFound'
import Navigation from './components/layout/Navigation'
import Routine from './components/routine/Routine'

import { useStoreDispatch } from './store'
import { LoginAPI } from './api/users/login.api'


function App() {
    const dispatch = useStoreDispatch()
    const location = useLocation()

    React.useEffect( () => {
        LoginAPI.refresh(
            () => {
                dispatch( { type: 'LOGIN' } )
            },
            error => {
                dispatch( { type: 'LOGOUT' } )
            }
        )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    return (
        <div className="mwr-content">
            <Router>
                <Switch>
                    <Route
                        path="/login"
                        render={
                            props => <Login history={ props.history } location_pathname={ location.pathname } />
                        }
                    />

                    <AuthRoute
                        path="/"
                        render={ props => <Calendar { ...props } /> }
                        exact={ true }
                    />

                    <AuthRoute
                        path="/create/exercise/:block_id"
                        render={ props => <CreateExercise { ...props } /> }
                    />

                    <AuthRoute
                        path="/record/:record_id"
                        render={ props => <Record { ...props } /> }
                    />

                    <AuthRoute
                        path="/routine"
                        render={ props => <Routine { ...props } /> }
                    />

                    <Route component={ NotFound } />
                </Switch>

                {/** Layout navigation */}
                <Navigation />
            </Router>
        </div>
    )
}

export default App
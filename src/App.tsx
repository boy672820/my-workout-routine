import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import AuthRoute from './components/AuthRoute'
import Calendar from './components/calendar/Calendar'
import Login from './components/login/Login'
import Record from './components/record/Record'
import CreateExercise from './components/create/CreateExercise'
import NotFound from './components/notfound/NotFound'
import Navigation from './components/layout/Navigation'
import Routine from './components/routine/Routine'

import { useStoreDispatch, useStoreState } from './store'
import { LoginAPI } from './api/users/login.api'


function App() {
    const { user } = useStoreState()
    const dispatch = useStoreDispatch()

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
                            props => <Login history={ props.history } />
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
                        path="/record/:block_id"
                        render={ props => <Record { ...props } /> }
                    />

                    <AuthRoute
                        path="/routine"
                        render={ props => <Routine { ...props } /> }
                    />

                    <Route component={ NotFound } />
                </Switch>

                {/** Layout navigation */}
                <Navigation user={ user } />
            </Router>
        </div>
    )
}

export default App
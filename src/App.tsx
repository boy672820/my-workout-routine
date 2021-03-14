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

import { useStoreState } from './store'
import { LoginAPI } from './api/users/login.api'


function App() {
    const { user } = useStoreState()

    React.useEffect( () => {
        LoginAPI.authenticate().then( response => {
            console.log( response )
        } )
    }, [] )

    return (
        <>
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
                    <Navigation user={ user } />
                </Router>
            </div>
        </>
    )
}

export default App
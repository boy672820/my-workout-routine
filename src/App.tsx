import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

import AuthRoute from './components/AuthRoute'
import Calendar from './components/calendar/Calendar'
import Login from './components/login/Login'
import Record from './components/record/Record'
import CreateExercise from './components/create/CreateExercise'
import NotFound from './components/notfound/NotFound'


interface AppPropsInterface {
    cookies: Cookies
}
interface AppStateInterface {
}


class App extends Component <AppPropsInterface, AppStateInterface> {

    static propTypes = {
        cookies: instanceOf( Cookies ).isRequired
    }

    constructor( props: AppPropsInterface ) {
        super( props )

        this.state = {}
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" render={ ( props ) => <Login cookies={ this.props.cookies } history={ props.history } /> } />

                    <AuthRoute path="/" component={ Calendar } cookies={ this.props.cookies } exact={ true } />

                    <AuthRoute path="/create/exercise/:block_id" component={ CreateExercise } cookies={ this.props.cookies } />

                    <AuthRoute path="/record" component={ Record } cookies={ this.props.cookies } />

                    <Route component={ NotFound } />
                </Switch>
            </Router>
        )
    }
}

export default withCookies( App )
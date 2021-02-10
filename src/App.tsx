import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import axios from 'axios'

import Calendar from './components/calendar/Calendar'
import Login from './components/login/Login'


export default class App extends Component {
    render() {
        const isLoginRedirect = ! axios.defaults.headers.common.Authorization ? <Redirect to="/login" /> : ''

        return (
            <Router>
                {isLoginRedirect}
                <Route exact path="/" component={Calendar} />
                <Route exact path="/login" component={Login} />
            </Router>
        )
    }
}

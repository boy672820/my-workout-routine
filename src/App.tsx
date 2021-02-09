import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Calendar from './components/calendar/Calendar'
import Login from './components/login/Login'


export default class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Calendar} />
                <Route exact path="/login" component={Login} />
            </Router>
        )
    }
}

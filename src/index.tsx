import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './common/normalize.minify.css'
import './common/common.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// Axios defaults config.
axios.defaults.baseURL = process.env.REACT_APP_REST_URI

export default function Root() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
}
  

ReactDOM.render( Root(), document.getElementById( 'root' ) )
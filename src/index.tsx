import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { CookiesProvider } from 'react-cookie'

import App from './App'

import './common/normalize.minify.css'
import './common/common.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// Axios defaults config.
axios.defaults.baseURL = process.env.REACT_APP_REST_URI

export default function Root() {
    return (
        <CookiesProvider>
            <App />
        </CookiesProvider>
    )
}
  

ReactDOM.render( Root(), document.getElementById( 'root' ) )
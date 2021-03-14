import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { StoreProvider } from './store'

import './common/normalize.minify.css'
import './common/common.css'
import 'bootstrap/dist/css/bootstrap.min.css'


// Axios defaults config.
axios.defaults.baseURL = process.env.REACT_APP_REST_URI
axios.defaults.withCredentials = true

export default function Root() {
    return (
        <StoreProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StoreProvider>
    )
}

ReactDOM.render( Root(), document.getElementById( 'root' ) )
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import App from './App'

import './common/normalize.minify.css'
import './common/common.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// Axios defaults config.
axios.defaults.baseURL = process.env.REACT_APP_REST_URI

ReactDOM.render( <App />, document.getElementById( 'root' ) )
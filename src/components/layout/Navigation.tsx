import React from "react"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboardList } from "@fortawesome/free-solid-svg-icons"
import { Container } from "react-bootstrap"

import './navigation.css'


function Navigation() {
    return (
        <nav className="mwr-nav">
            <Container>
                <ul className="mwr-nav-list">
                    <li className="mwr-nav-item">
                        <Link to="/">
                            <FontAwesomeIcon icon={ faClipboardList } title="운동기록" />
                        </Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navigation
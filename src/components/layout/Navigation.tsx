import React from "react"
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendarAlt, faClipboardCheck, faDumbbell, faSignOutAlt } from "@fortawesome/free-solid-svg-icons"
import { Container } from "react-bootstrap"

import './navigation.css'


function Navigation() {
    const { pathname } = useLocation()

    const handleClick = ( e: React.MouseEvent<HTMLAnchorElement> ) => {
        e.preventDefault()
    }

    return (
        <nav className="mwr-nav text align center">
            <Container>
                <ul className="mwr-nav-list">
                    <li className="mwr-nav-item">
                        <Link to="/login" onClick={ handleClick }>
                            <FontAwesomeIcon icon={ faSignOutAlt } title="로그아웃" />
                        </Link>
                    </li>
                    <li className="mwr-nav-item">
                        <Link to="/">
                            <FontAwesomeIcon icon={ faDumbbell } title="내 루틴 확인" />
                        </Link>
                    </li>
                    <li className={ `mwr-nav-item ${pathname === '/' ? 'active' : ''}` }>
                        <Link to="/">
                            <FontAwesomeIcon icon={ faCalendarAlt } title="기록된 운동 목록" />
                        </Link>
                    </li>
                    <li className={ `mwr-nav-item ${pathname === '/record' ? 'active' : ''}` }>
                        <Link to="/record">
                            <FontAwesomeIcon icon={ faClipboardCheck } title="운동기록 상세확인" />
                        </Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navigation
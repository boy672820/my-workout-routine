import React from "react"
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCalendarAlt,
    faClipboardCheck,
    faDumbbell,
    faSignOutAlt,
    faSignInAlt
} from "@fortawesome/free-solid-svg-icons"
import { Container } from "react-bootstrap"

import './navigation.css'
import { LoginAPI } from "../../api/users/login.api"
import { useStoreDispatch, useStoreState } from "../../store"


function Navigation() {
    const { pathname } = useLocation()
    const history = useHistory()
    const dispatch = useStoreDispatch()
    const { user } = useStoreState()

    // Handle click.
    const handleLogout = ( e: React.MouseEvent<HTMLAnchorElement> ) => {
        e.preventDefault()

        LoginAPI.logout()
        dispatch( { type: 'LOGOUT' } )

        // Move login.
        history.push( '/login' )
    }


    // Active item.
    const activeItem = ( name: string ) => {
        return pathname === `/${name}` ? 'active' : ''
    }


    // Sign in or out.
    const signIn = <Link to="/login">
                        <FontAwesomeIcon icon={ faSignInAlt } title="로그인" />
                    </Link>

    const signOut = <Link to="/login" onClick={ handleLogout }>
                        <FontAwesomeIcon icon={ faSignOutAlt } title="로그아웃" />
                    </Link>

    // Set sign in or out.
    let signInOrOut
    if ( user ) signInOrOut = signOut
    else signInOrOut = signIn


    // Return...
    return (
        <nav className="mwr-nav text align center">

            <Container>

                <ul className="mwr-nav-list">

                    <li className={ `mwr-nav-item ${ activeItem( 'login' ) }` }>
                        { signInOrOut }
                    </li>

                    <li className={ `mwr-nav-item ${ activeItem( 'routine' ) }` }>
                        <Link to="/routine">
                            <FontAwesomeIcon icon={ faDumbbell } title="내 루틴 확인" />
                        </Link>
                    </li>

                    <li className={ `mwr-nav-item ${ activeItem( '' ) }` }>
                        <Link to="/">
                            <FontAwesomeIcon icon={ faCalendarAlt } title="기록된 운동 목록" />
                        </Link>
                    </li>

                    <li className={ `mwr-nav-item ${ activeItem( 'record' ) }` }>
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
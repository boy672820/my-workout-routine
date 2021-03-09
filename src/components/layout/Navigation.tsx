import React from "react"
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useCookies } from "react-cookie"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faCalendarAlt,
    faClipboardCheck,
    faDumbbell,
    faSignOutAlt,
    faSignInAlt
} from "@fortawesome/free-solid-svg-icons"
import { Container } from "react-bootstrap"
import axios from "axios"

import './navigation.css'


interface NavigationPropsInterface {
    user: any
    setUser: any
}


function Navigation( { user, setUser }: NavigationPropsInterface ) {
    const { pathname } = useLocation()
    const history = useHistory()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ cookies, setCookie, removeCookie ] = useCookies( [ 'token' ] )


    // Handle click.
    const handleClick = ( e: React.MouseEvent<HTMLAnchorElement> ) => {
        e.preventDefault()

        // Remove access & refresh token.
        axios.defaults.headers.common.Authorization = ''
        removeCookie( 'token' )
        // Set status to user state.
        setUser( 0 )
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

    const signOut = <Link to="/login" onClick={ handleClick }>
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
/* eslint no-useless-escape: 0 */
import React, { Component } from 'react'
import {
    Container,
    Form,
    Button,
    Alert
} from 'react-bootstrap'

import './login.css'

import { LoginPropsInterface, LoginStateInterface } from './login.interface'
import { LoginDto } from '../../api/users/dto/login.dto'
import { LoginAPI } from '../../api/users/login.api'
import { storeDispatchContext, storeStateContext } from '../../store'
import { Redirect } from 'react-router'


class Login extends Component<LoginPropsInterface, LoginStateInterface> {

    static contextType = storeDispatchContext

    constructor( props: LoginPropsInterface ) {
        super( props )

        this.state = {
            email: '',
            password: '',
            valid_email: true,
            valid_password: true,
            valid_login: true,
            success: false
        }

        this.handleChange = this.handleChange.bind( this )
        this.handleSubmit = this.handleSubmit.bind( this )
    }

    

    async handleChange( { currentTarget }: React.ChangeEvent<HTMLInputElement> ) {
        const value = currentTarget.value
        const name = currentTarget.name

        if ( name === 'email' ) this.setState( { email: value } )
        else if ( name === 'password' ) this.setState( { password: value } )
    }

    async handleSubmit( e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault()

        const email = this.state.email
        const password = this.state.password

        const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

        const validate = {
            valid_email: false,
            valid_password: false,
            valid_login: true
        }

        if ( ! email || ! regEmail.test( email ) ) validate.valid_email = false
        else validate.valid_email = true

        if ( ! password ) validate.valid_password = false
        else validate.valid_password = true

        this.setState( validate )

        // Success validate email and password.
        if ( validate.valid_email && validate.valid_password ) {
            // Response login api.
            const userData: LoginDto = { email: this.state.email, password: this.state.password }
            const loginResponse = LoginAPI.login( userData )

            // Login response.
            loginResponse.then( response => {
                if ( response.status === 201 ) {
                    this.setState( { valid_login: true, success: true } )

                    // Set user state.
                    this.context( { type: 'LOGIN' } )

                    // Push calender component.
                    this.props.history.push( '/' )
                }
                else this.setState( {
                    valid_login: false,
                    success: false
                } )
            } )
            .catch( error => {
                this.setState( {
                    valid_login: false,
                    success: false
                } )
            } )
        }
    }

    render() {
        const displayNone = { display: 'none' }
        const displayBlock = { display: 'block' }

        const is_alert = ! this.state.valid_email || ! this.state.valid_password ? false : true

        return (
            <storeStateContext.Consumer>
                {
                    ( user: any ) => {
                        const redirect = user ? <Redirect to="/" /> : ''

                        return (
                            <>
                                { redirect }

                                <main className="form-signin">
                        
                                    <Container>
                                        <Alert variant="danger" hidden={ is_alert } className="text align left">
                                            <div style={ this.state.valid_email ? displayNone : displayBlock }>이메일 양식에 맞게 입력해주세요.(예: example@gmail.com)</div>
                                            <div style={ this.state.valid_password ? displayNone : displayBlock }>비밀번호를 입력해주세요.</div>
                                        </Alert>

                                        <Alert variant="danger" hidden={ this.state.valid_login ? true : false } className="text align left">
                                            <div style={ this.state.valid_login ? displayNone : displayBlock }>이메일 또는 아이디가 틀립니다.</div>
                                        </Alert>

                                        <h3 className="h3 mb-3 fw-normal">로그인 해주세요.</h3>

                                        <Form onSubmit={ this.handleSubmit }>
                                            <Form.Group>
                                                <Form.Label htmlFor="email" hidden>이메일</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="example@gmail.com"
                                                    title="이메일을 입력해주세요."
                                                    id="email"
                                                    name="email"
                                                    className="login-form-top text align center"
                                                    size="lg"
                                                    onChange={ this.handleChange }
                                                    value={ this.state.email }
                                                />
                                                <Form.Label htmlFor="password" hidden>비밀번호</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="비밀번호를 입력해주세요."
                                                    title="비밀번호를 입력해주세요."
                                                    id="password"
                                                    name="password"
                                                    className="login-form-bottom text align center"
                                                    size="lg"
                                                    onChange={ this.handleChange }
                                                    value={ this.state.password }
                                                />
                                            </Form.Group>

                                            <Form.Group>
                                                <Button type="submit" size="lg" block>로그인</Button>
                                            </Form.Group>

                                        </Form>
                                        
                                    </Container>
                                </main>
                            </>
                        )
                    }
                }
            </storeStateContext.Consumer>
        )
    }
}

export default Login
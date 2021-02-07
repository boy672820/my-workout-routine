/* eslint no-useless-escape: 0 */
import React, { Component } from 'react'
import {
    Container,
    Form,
    Button,
    Alert
} from 'react-bootstrap'
import './login.css'

class Login extends Component {

    state = {
        email: '',
        valid_email: true,
        valid_password: true
    }

    handleChange = ( { target } ) => {
        const value = target.value

        this.setState( {
            email: value
        } )
    }

    handleSubmit = ( e ) => {
        e.preventDefault()

        const email = this.state.email
        const password = this.passwordRef.value

        const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

        const validate = {
            valid_email: false,
            valid_password: false
        }

        if ( ! email || ! regEmail.test( email ) ) validate.valid_email = false
        else validate.valid_email = true

        if ( ! password ) validate.valid_password = false
        else validate.valid_password = true

        if ( validate.valid_email && validate.valid_password ) {

        }
        else this.setState( validate )
    }

    render() {
        const displayNone = { display: 'none' }
        const displayBlock = { display: 'block' }

        const is_alert = ! this.state.valid_email || ! this.state.valid_password ? false : true

        return (
            <main className="form-signin">
    
                <Container>
                    <Alert variant="danger" hidden={ is_alert } className="text align left">
                        <div style={ this.state.valid_email ? displayNone : displayBlock }>이메일 양식에 맞게 입력해주세요.(예: example@gmail.com)</div>
                        <div style={ this.state.valid_password ? displayNone : displayBlock }>비밀번호를 입력해주세요.</div>
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
                                className="login-form-top"
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
                                className="login-form-bottom"
                                size="lg"
                                ref={ ref => this.passwordRef = ref }
                            />
                        </Form.Group>

                        <Form.Group>
                            <Button type="submit" size="lg" block>로그인</Button>
                        </Form.Group>

                    </Form>
                    
                </Container>
            </main>
        )
    }
}

export default Login
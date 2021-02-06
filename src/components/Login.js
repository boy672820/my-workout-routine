import React, { Component } from 'react'
import {
    Container,
    Form,
    Button
} from 'react-bootstrap'
import './login.css'

class Login extends Component {

    handleSubmit = ( e ) => {
        e.preventDefault()
    }
    
    render() {
        return (
            <main className="form-signin">
                <Container>

                    <h3 className="h3 mb-3 fw-normal">로그인 해주세요.</h3>

                    <Form onSubmit={ this.handleSubmit }>
                        <Form.Group>
                            <Form.Label htmlFor="email" hidden>이메일</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="이메일을 입력해주세요."
                                id="email"
                                name="email"
                                size="lg"
                                style={ {
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 0
                                } }
                            />
                            <Form.Label htmlFor="password" hidden>비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="비밀번호를 입력해주세요."
                                id="password"
                                name="password"
                                size="lg"
                                style={ {
                                    borderTopWidth: 0,
                                    borderTopRightRadius: 0,
                                    borderTopLeftRadius: 0
                                } }
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
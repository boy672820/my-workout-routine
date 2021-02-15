import React, { Component } from 'react'
import {
    Container,
    Form,
    InputGroup,
    Button
} from 'react-bootstrap'

import './create.css'


class Create extends Component {
    render() {
        return (
            <main className="main">

                <Container>

                    <Form>

                        <Form.Group>
                            <Form.Label htmlFor="exercise_name">종목</Form.Label>
                            <Form.Control type="text" name="exercise_name" id="exercise_name" placeholder="종목을 입력해주세요." />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="set_number">세트</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Button>감소</Button>
                                </InputGroup.Prepend>
                                <Form.Control type="text" name="set_number" id="set_number" placeholder="세트을 입력해주세요." />
                                <InputGroup.Append>
                                    <Button>증가</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="set_reps">횟수</Form.Label>

                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Button>감소</Button>
                                </InputGroup.Prepend>
                                <Form.Control type="text" name="set_reps" id="set_reps" placeholder="횟수를 입력해주세요." />
                                <InputGroup.Append>
                                    <Button>증가</Button>
                                </InputGroup.Append>
                            </InputGroup>

                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Button>감소</Button>
                                </InputGroup.Prepend>
                                <Form.Control type="text" name="set_max_reps" id="set_max_reps" placeholder="횟수를 입력해주세요." />
                                <InputGroup.Append>
                                    <Button>증가</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="weight">중량</Form.Label>
                            <Form.Control type="text" name="weight" id="weight" placeholder="중량을 입력해주세요." />
                        </Form.Group>

                    </Form>

                </Container>

            </main>
        )    
    }
}

export default Create
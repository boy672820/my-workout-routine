import React, { Component } from 'react'
import {
    Form,
    InputGroup,
    Button,
    Modal
} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faAngleDown,
    faAngleUp
} from "@fortawesome/free-solid-svg-icons"

import CreateEditSet from './CreateEditSet'

import './create.css'


interface CreateExerciseModalPropsInterface {
    parent: any
    prefix: string
}
interface CreateExerciseModalStateInterface {}


class CreateExerciseModal extends Component<CreateExerciseModalPropsInterface, CreateExerciseModalStateInterface> {

    constructor( props: CreateExerciseModalPropsInterface ) {
        super( props )

        this.state = {}

    }

    render() {
        const { parent } = this.props

        return (
            <Modal size="lg" show={parent.state.create_modal} onHide={ parent.handleCreateModal } centered>
                <Form onSubmit={ parent.handleSubmit }>

                    <Modal.Header closeButton>
                        <Modal.Title>운동 일정 작성</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Label htmlFor="exercise_name">종목</Form.Label>
                            <Form.Control
                                type="text"
                                name="exercise_name"
                                id="exercise_name"
                                placeholder="종목을 입력해주세요."
                                onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => parent.handleForm( e, '' ) }
                                // value={ this.state.exercise_name }
                                ref={ parent.exerciseRef }
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="set_number">세트</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Button variant="outline-secondary" title="감소" onClick={ () => parent.handleIncrement( 'set_number', -1 ) }><FontAwesomeIcon icon={ faAngleDown } /></Button>
                                </InputGroup.Prepend>
                                <Form.Control type="text" name="set_number" id="set_number" placeholder="세트" onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => parent.handleForm( e, '' ) } value={ parent.state.set_number } />
                                <InputGroup.Append>
                                    <Button variant="outline-secondary" title="증가" onClick={ () => parent.handleIncrement( 'set_number', 1 ) }><FontAwesomeIcon icon={ faAngleUp } /></Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        <CreateEditSet parent={ parent } prefix='' />

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" type="submit" size="lg" className="create-submit-btn">저장</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default CreateExerciseModal
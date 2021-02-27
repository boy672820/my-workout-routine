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
import { RoutineExerciseDTO } from '../../api/routine/dto/routine.exercise.dto'
import { RoutineAPI } from '../../api/routine/routine.api'

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

        /** Bind events. */
        this.handleSubmit = this.handleSubmit.bind( this )
    }

    /**
     * Request api to save exercise data
     * and get response data to exercises data.
     * @param e Form event.
     */
    async handleSubmit( e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault()

        const { parent } = this.props

        // Valid exercise name.
        const ref = parent.exerciseRef.current
        if ( ! parent.state.exercise_name ) ref.style.border = '1px solid #dc3545'

        else {
            const {
                block_id,
                exercise_name,
                set_number,
                set_weight,
                set_reps,
                set_max_reps,
                set_disable_range,
                set_rir,
                set_rest_minute,
                set_rest_second } = parent.state
            const set_rest = set_rest_minute * 60 + set_rest_second

            const data: RoutineExerciseDTO = {
                block_id: block_id,
                exercise_name: exercise_name,
                set_number: set_number,
                set_weight: set_weight,
                set_reps: set_reps,
                set_max_reps: set_max_reps,
                set_disable_range: set_disable_range,
                set_rir: set_rir,
                set_rest: set_rest
            }
            // Create exercise and sets.
            await RoutineAPI.createExercise( data )

            // Reload exercise and sets.
            await RoutineAPI.getExercises( block_id )
                .then( ( { data } ) => {
                    parent.setState( {
                        exerciseData: data,
                        create_modal: false,
                        exercise_name: '',
                        weight: 0,
                        rir: 0
                    } )
                } )
        }
    }

    render() {
        const { parent, prefix } = this.props

        return (
            <Modal size="lg" show={parent.state.create_modal} onHide={ parent.handleCreateModal } centered>
                <Form onSubmit={ this.handleSubmit }>

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

                        <CreateEditSet parent={ parent } prefix={ prefix } />

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
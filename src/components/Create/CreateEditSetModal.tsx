import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBurn } from "@fortawesome/free-solid-svg-icons"
import {
    Modal,
    Form,
    Button
} from 'react-bootstrap'

import CreateEditSet from './CreateEditSet'
import { RoutineAPI } from '../../api/routine/routine.api'
import { RoutineUpdateSetDTO } from '../../api/routine/dto/routine.update.set.dto'


interface CreateEditSetModalPropsInterface {
    parent: any
    prefix: string
}

interface CreateEditSetModalStateInterface {}


class CreateEditSetModal extends Component<CreateEditSetModalPropsInterface, CreateEditSetModalStateInterface> {

    constructor( props: CreateEditSetModalPropsInterface ) {
        super( props )

        this.state = {}

        this.handleSubmit = this.handleSubmit.bind( this )
    }

    async handleSubmit( e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault()

        const { parent } = this.props
        const {
            edit_ID,
            edit_exercise_id,
            edit_set_reps,
            edit_set_max_reps,
            edit_set_disable_range,
            edit_set_weight,
            edit_set_rir,
            edit_set_rest_minute,
            edit_set_rest_second
        } = parent.state
        const edit_set_rest = edit_set_rest_minute * 60 + edit_set_rest_second

        const data: RoutineUpdateSetDTO = {
            ID: edit_ID,
            exercise_id: edit_exercise_id,
            set_reps: edit_set_reps,
            set_max_reps: edit_set_max_reps,
            set_disable_range: edit_set_disable_range,
            set_weight: edit_set_weight,
            set_rir: edit_set_rir,
            set_rest: edit_set_rest
        }

        const response = RoutineAPI.updateExerciseSet( data )

        response.then( ( { data } ) => {
            if ( data.raw.serverStatus === 2 ) {
                RoutineAPI.getExercises( parent.state.block_id )
                    .then( ( { data } ) => {
                        parent.setState( {
                            exerciseData: data,
                            edit_set_modal: false
                        } )
                    } )
            }
        } )
    }

    render() {
        const { parent, prefix } = this.props

        return (
            <Modal size="lg" show={ parent.state.edit_set_modal } onHide={ parent.handleEditSetModal } centered>
                <Form onSubmit={ this.handleSubmit }>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <FontAwesomeIcon icon={ faBurn } />&nbsp;
                            "{parent.state.edit_exercise_name}" {parent.state.edit_set_number}세트 수정
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <CreateEditSet parent={ parent } prefix={ prefix } />

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" type="button" size="lg" onClick={ parent.handleEditSetModal }>닫기</Button>
                        <Button type="submit" size="lg">수정하기</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default CreateEditSetModal
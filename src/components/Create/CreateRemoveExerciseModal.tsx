import React, { Component } from 'react'
import {
    Modal,
    Button
} from 'react-bootstrap'

import { RoutineAPI } from '../../api/routine/routine.api'

interface RemoveExercisePropsInterface {
    parent: any
}
interface RemoveExerciseStateInterface {}


class CreateRemoveExerciseModal extends Component<RemoveExercisePropsInterface, RemoveExerciseStateInterface> {

    constructor( props: RemoveExercisePropsInterface ) {
        super( props )

        this.state = {}

        this.handleRemoveExerciseSubmit = this.handleRemoveExerciseSubmit.bind( this )
    }

    /**
     * Handle remove exercise submit.
     */
    async handleRemoveExerciseSubmit() {
        const { parent } = this.props

        parent.handleRemoveExerciseModal()

        const remove_exercise_id = parent.state.remove_exercise_id as number
        const response = RoutineAPI.removeExercise( remove_exercise_id )

        response.then( ( { data } ) => {
            if ( data.raw.serverStatus === 2 ) {
                RoutineAPI.getExercises( parent.state.block_id )
                    .then( ( { data } ) => {
                        parent.setState( {
                            exerciseData: data
                        } )
                    } )
            }
        } )
    }

    render() {
        const { parent } = this.props

        return (
            <Modal size="lg" show={ parent.state.remove_exercise_modal } onHide={ parent.handleRemoveExerciseModal } centered>
                <Modal.Header closeButton>
                    <Modal.Title>운동 종목 삭제</Modal.Title>
                </Modal.Header>

                <Modal.Body style={ { fontSize: 16 } }>
                    "{ parent.state.remove_exercise_name }" 종목을 삭제 하시겠습니까?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" type="button" size="lg" onClick={ parent.handleRemoveExerciseModal }>아니오</Button>
                    <Button variant="danger" type="button" size="lg" onClick={ this.handleRemoveExerciseSubmit }>삭제</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CreateRemoveExerciseModal
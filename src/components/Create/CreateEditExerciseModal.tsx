import React, { Component } from 'react'
import {
    Modal,
    Form,
    Button
} from 'react-bootstrap'
import { RoutineUpdateExerciseDTO } from '../../api/routine/dto/routine.update.exercise.dto'
import { RoutineAPI } from '../../api/routine/routine.api'


interface EditExercisePropsInterface {
    parent: any
    modal: boolean
    handleModal: any
    exercise_id: number
    exercise_name: string
    handleExerciseForm: any
}
interface EditExerciseStateInterface {}


class CreateEditExerciseModal extends Component<EditExercisePropsInterface, EditExerciseStateInterface> {

    constructor( props: EditExercisePropsInterface ) {
        super( props )

        this.state = {}

        this.handleSubmit = this.handleSubmit.bind( this )
    }

    async handleSubmit( e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault()

        const { parent, handleModal } = this.props
        const { exercise_id, exercise_name } = this.props

        const data: RoutineUpdateExerciseDTO = {
            ID: exercise_id,
            exercise_name: exercise_name
        }

        const response = RoutineAPI.updateExercise( data )

        response.then( ( { data } ) => {
            if ( data.raw.serverStatus === 2 ) {
                RoutineAPI.getExercises( parent.state.block_id )
                    .then( ( { data } ) => {
                        parent.setState(
                            { exerciseData: data },
                            () => {
                                handleModal()
                            }
                        )
                    } )
            }
        } )
    }

    render() {
        const { modal, handleModal, exercise_name, handleExerciseForm } = this.props

        return (
            <Modal size="lg" show={ modal } onHide={ handleModal } centered>
                <Form onSubmit={ this.handleSubmit }>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            운동 종목명 수정
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group>
                            <Form.Label htmlFor="edit_exercise_name">종목</Form.Label>
                            <Form.Control
                                type="text"
                                name="edit_exercise_name"
                                id="edit_exercise_name"
                                onChange={ handleExerciseForm }
                                value={ exercise_name }
                            />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" type="button" size="lg" onClick={ handleModal }>닫기</Button>
                        <Button type="submit" size="lg">수정하기</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
    
}

export default CreateEditExerciseModal
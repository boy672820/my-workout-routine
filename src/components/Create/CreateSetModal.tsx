import React, { Component } from 'react'
import {
    Modal,
    Form,
    Button
} from 'react-bootstrap'
import { RoutineCreateSetDTO } from '../../api/routine/dto/routine.create.set.dto'
import { RoutineAPI } from '../../api/routine/routine.api'
import CreateEditSet from './CreateEditSet'


interface SetModalPropsInterface {
    modal: boolean
    handleModal: any,
    parent: any
}
interface SetModalStateInterface {}


class CreateSetModal extends Component<SetModalPropsInterface, SetModalStateInterface> {

    constructor( props: SetModalPropsInterface ) {
        super( props )

        this.state = {}

        this.handleSubmit = this.handleSubmit.bind( this )
    }

    async handleSubmit( e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault()

        const { parent } = this.props

        const {
            create_set_exercise_id,
            create_set_weight,
            create_set_reps,
            create_set_max_reps,
            create_set_disable_range,
            create_set_rir,
            create_set_rest_minute,
            create_set_rest_second
        } = parent.state
        const create_set_rest = create_set_rest_minute * 60 + create_set_rest_second

        const data: RoutineCreateSetDTO = {
            exercise_id: create_set_exercise_id,
            set_weight: create_set_weight,
            set_reps: create_set_reps,
            set_max_reps: create_set_max_reps,
            set_disable_range: create_set_disable_range,
            set_rir: create_set_rir,
            set_rest: create_set_rest
        }
        
        const response = RoutineAPI.createExerciseSet( data )

        response.then( ( { data } ) => {
            if ( data.statusCode === 500 ) return

            RoutineAPI.getExercises( parent.state.block_id )
                .then( ( { data } ) => {
                    // Close modal.
                    this.props.handleModal()
                    // Reload exercises data.
                    parent.setState( {
                        exerciseData: data
                    } )
                } )
        } )
    }

    render() {
        const { parent } = this.props

        return (
            <Modal size="lg" show={ this.props.modal } onHide={ this.props.handleModal } centered>
                <Form onSubmit={ this.handleSubmit }>
                    <Modal.Header closeButton>
                        <Modal.Title>"{ parent.state.create_set_exercise_name }" 세트 추가</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <CreateEditSet parent={ parent } prefix="create_" />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" type="button" size="lg" onClick={ this.props.handleModal }>아니오</Button>
                        <Button variant="warning" type="submit" size="lg">추가</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
    
}

export default CreateSetModal
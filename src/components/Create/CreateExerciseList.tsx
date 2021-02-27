import React, { Component } from 'react'
import {
    Container,
    Col,
    Card,
    Button,
    Table,
    Row
} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faEdit,
    faTrashAlt,
    faBurn,
    faDumbbell
} from "@fortawesome/free-solid-svg-icons"

import {
    CreateExerciseDataInterface,
    CreateExerciseSetInterface
} from './create.interface'
import { RoutineAPI } from '../../api/routine/routine.api'
import CreateSetModal from './CreateSetModal'
import CreateEditExerciseModal from './CreateEditExerciseModal'


interface ExerciseListPropsInterface {
    parent: any
}
interface ExerciseListStateInterface {
    edit_exercise_modal: boolean
    create_set_modal: boolean
    edit_exercise_id: number
    edit_exercise_name: string
}


class CreateExerciseList extends Component<ExerciseListPropsInterface, ExerciseListStateInterface> {

    constructor( props: ExerciseListPropsInterface ) {
        super( props )

        this.state = {
            edit_exercise_modal: false,
            create_set_modal: false,
            edit_exercise_id: -1,
            edit_exercise_name: ''
        }

        /** Bind events */
        this.handleEditSet = this.handleEditSet.bind( this )
        this.handleRemoveExercise = this.handleRemoveExercise.bind( this )
        this.handleRemoveSet = this.handleRemoveSet.bind( this )
        this.handleCreateSetModal = this.handleCreateSetModal.bind( this )
        this.handleCreateSet = this.handleCreateSet.bind( this )
        this.handleEditExercise = this.handleEditExercise.bind( this )
        this.handleEditExerciseModal = this.handleEditExerciseModal.bind( this )
        this.handleEditExerciseForm = this.handleEditExerciseForm.bind( this )
    }

    async handleEditExerciseModal() {
        const { edit_exercise_modal } = this.state

        this.setState( {
            edit_exercise_modal: ! edit_exercise_modal
        } )
    }

    async handleEditExercise( id: number, exercise_name: string ) {
        this.handleEditExerciseModal()

        this.setState( {
            edit_exercise_id: id,
            edit_exercise_name: exercise_name
        } )
    }

    async handleEditExerciseForm( e: React.ChangeEvent<HTMLInputElement> ) {
        const { value } = e.target

        this.setState( {
            edit_exercise_name: value
        } )
    }

    async handleCreateSetModal() {
        const { create_set_modal } = this.state

        this.setState( {
            create_set_modal: ! create_set_modal
        } )
    }

    async handleCreateSet( exercise_id: number, exercise_name: string ) {
        this.handleCreateSetModal()

        const { parent } = this.props

        parent.setState( {
            create_set_exercise_id: exercise_id,
            create_set_exercise_name: exercise_name
        } )
    }

    /**
     * Handle remove exercise.
     * @param exercise_id 
     * @param exercise_name 
     */
    async handleRemoveExercise( exercise_id: number, exercise_name: string ) {
        const { parent } = this.props

        parent.handleRemoveExerciseModal()

        parent.setState( {
            remove_exercise_name: exercise_name,
            remove_exercise_id: exercise_id
        } )
    }

    /**
     * Handle edit set.
     * @param exercise_name
     * @param data
     */
    async handleEditSet( exercise_name: string, data: CreateExerciseSetInterface ) {
        const { parent } = this.props

        parent.handleEditSetModal()

        const { set_rest } = data

        const rest_minute = Math.floor( set_rest / 60 )
        const rest_second = set_rest - ( rest_minute * 60 )

        parent.setState( {
            edit_exercise_name: exercise_name,
            edit_ID: data.ID,
            edit_exercise_id: data.exercise_id,
            edit_set_number: data.set_number,
            edit_set_reps: data.set_reps,
            edit_set_max_reps: data.set_max_reps,
            edit_set_disable_range: data.set_disable_range,
            edit_set_weight: data.set_weight,
            edit_set_rir: data.set_rir,
            edit_set_rest_minute: rest_minute,
            edit_set_rest_second: rest_second
        } )
    }

    async handleRemoveSet( id: number, exercise_id: number ) {
        const { parent } = this.props

        // Remove set and reorder by set_number and get exercises data.
        const response = RoutineAPI.removeSetAndReorder( id, exercise_id, parent.state.block_id )

        response.then( response => {
            if ( response.status === 200 ) {
                parent.setState( { exerciseData: response.data } )
            }
        } )
    }

    render() {
        const { parent } = this.props

        return (
            <Container>
                <header className="create-header">
                    <h5>생선된 운동</h5>
                </header>

                {
                    ( ( data ) => {

                        const res: JSX.Element[] = []

                        // Set item list.
                        data.forEach( ( row: CreateExerciseDataInterface, index: number ) => {
                            const setElements: JSX.Element[] = []

                            row.sets.forEach( ( set, index ) => {
                                const rest_minute = Math.floor( set.set_rest / 60 )
                                const rest_second = set.set_rest - ( rest_minute * 60 )

                                setElements.push(
                                    <tr key={ index }>
                                        <td className="vertical align middle set-td first-td">
                                            { set.set_number }세트
                                        </td>
                                        <td className="vertical align middle set-td">
                                            { set.set_weight }kg
                                        </td>
                                        <td className="vertical align middle set-td">
                                            { set.set_reps }{ ! set.set_disable_range ? `~${ set.set_max_reps }` : '' }회
                                        </td>
                                        <td className="vertical align middle set-td">
                                            { set.set_rir }RIR
                                        </td>
                                        <td className="vertical align middle set-td">
                                            { rest_minute || rest_second ? '' : '휴식없음' }
                                            { rest_minute ? `${rest_minute}분` : '' }&nbsp;
                                            { rest_second ? `${rest_second}초` : '' }
                                        </td>
                                        <td className="vertical align middle set-td" width="10">
                                            <Button variant="link" onClick={ () => this.handleEditSet( row.exercise_name, set ) }>
                                                <FontAwesomeIcon icon={faEdit} title={ `${set.set_number}세트 수정` } />
                                            </Button>
                                        </td>
                                        <td className="vertical align middle set-td last-td" width="10">
                                            <Button variant="link" onClick={ () => this.handleRemoveSet( set.ID, row.ID ) }>
                                                <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#dc3545' }} />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            } )

                            // Add set button.
                            setElements.push(
                                <tr key={ -1 }>
                                    <td colSpan={ 7 } className="create-add-set-td">
                                        <Button
                                            variant="secondary"
                                            size="lg"
                                            className="create-add-set-btn"
                                            onClick={ () => this.handleCreateSet( row.ID, row.exercise_name ) }
                                        >
                                            세트 추가
                                        </Button>
                                    </td>
                                </tr>
                            )

                            // Exercise item card.
                            res.push(
                                <Card className="create-item" key={ index }>
                                    <Card.Header>
                                        <Row>
                                            <Col xs={ 6 }>
                                                <h5 className="create-exercise-header no margin">
                                                    <FontAwesomeIcon icon={ faBurn } />
                                                    &nbsp;{ row.exercise_name }
                                                </h5>
                                            </Col>
                                            <Col xs={ 6 } className="text align right create-exercise-remove-btn">
                                                <Button variant="link" onClick={ () => this.handleEditExercise( row.ID, row.exercise_name ) }>
                                                    <FontAwesomeIcon icon={faEdit} title="운동 종목명 변경" />
                                                </Button>
                                                <Button variant="link" onClick={ () => this.handleRemoveExercise( row.ID, row.exercise_name ) }>
                                                    <FontAwesomeIcon icon={faTrashAlt} style={{ color: '#dc3545' }} />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body className="no padding">
                                        <Table className="record-item-table no margin text align center">
                                            <tbody>
                                                { setElements }
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            )
                        } )

                        return res

                    } )( parent.state.exerciseData )
                }

                <Button variant="warning" type="button" size="lg" className="create-modal-btn" onClick={ parent.handleCreateModal }>
                    <FontAwesomeIcon icon={ faDumbbell } />&nbsp;
                    종목 추가하기
                </Button>

                {/** Create set modal component. */}
                <CreateEditExerciseModal
                    parent={ parent }
                    modal={ this.state.edit_exercise_modal }
                    handleModal={ this.handleEditExerciseModal }
                    exercise_id={ this.state.edit_exercise_id }
                    exercise_name={ this.state.edit_exercise_name }
                    handleExerciseForm={ this.handleEditExerciseForm }
                />

                {/** Create set modal component. */}
                <CreateSetModal modal={ this.state.create_set_modal } handleModal={ this.handleCreateSetModal } parent={ parent } />

            </Container>
        )
    }
}

export default CreateExerciseList
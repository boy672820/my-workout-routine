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

import { CreateExerciseDataInterface, } from './create.interface'


interface ExerciseListPropsInterface {
    parent: any
}
interface ExerciseListStateInterface {}


class CreateExerciseList extends Component<ExerciseListPropsInterface, ExerciseListStateInterface> {

    constructor( props: ExerciseListPropsInterface ) {
        super( props )

        this.state = {}
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
                                            { rest_minute && rest_second ? '' : '휴식없음' }
                                            { rest_minute ? `${rest_minute}분` : '' }&nbsp;
                                            { rest_second ? `${rest_second}초` : '' }
                                        </td>
                                        <td className="vertical align middle set-td" width="10">
                                            <Button variant="link" onClick={ () => parent.handleEditSet( row.exercise_name, set ) }>
                                                <FontAwesomeIcon icon={faEdit} title={ `${set.set_number}세트 수정` } />
                                            </Button>
                                        </td>
                                        <td className="vertical align middle set-td last-td" width="10">
                                            <Button variant="link">
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
                                        <Button variant="secondary" size="lg" className="create-add-set-btn">세트 추가</Button>
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
                                                <Button variant="link" onClick={ () => parent.handleRemoveExercise( row.ID, row.exercise_name ) }>
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

            </Container>
        )
    }
}

export default CreateExerciseList
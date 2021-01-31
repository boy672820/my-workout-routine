import React, { Component } from 'react'
import {
    Button,
    Table,
    Container,
    Row,
    Col,
} from 'react-bootstrap'

import EditSetModal from './EditSetModal'


class ExerciseList extends Component {

    state = {
        is_modal: false,
        editSetData: 0
    }

    /**
     * Remove exercise.
     */
    handleRemoveExercise = ( e ) => {
        const idx = e.target.dataset.idx // Target index.
        const res = this.props.data.slice() // Copy props data(exerciseList in state from parent).

        // Remove target element.
        res.splice( idx, 1 )

        // Lifting state up.
        this.props.handleChild( {
            exerciseList: res
        } )
    }

    /**
     * Remove set in exercise.
     */
    handleRemoveSet = ( e ) => {
        const dataset = e.target.dataset
        const idx = dataset.idx // Set index.
        const exercise_idx = dataset.exercise // Parent index.
        const res = this.props.data.slice() // Copy props data.

        // Remove set.
        res[ exercise_idx ].sets.splice( idx, 1 )

        // Reset column set in exercise sets.
        for ( const [ key, value ] of Object.entries( res[ exercise_idx ].sets ) ) {
            value.set = Number( key ) + 1
        }

        // Lifting state up.
        this.props.handleChild( {
            exerciseList: res
        } )
    }

    handleModal = () => {
        this.setState( {
            is_modal: ! this.state.is_modal
        } )
    }

    handleEditSet = ( e ) => {
        this.setState( {
            is_modal: true, // Open modal popup.
            editSetData: e.target.dataset
        } )
    }

    render() {

        return (
            <div className="container">

                <hr />

                {this.props.data.map( ( row, index ) => {
                    return (
                        <Container key={index}>

                            <Row>
                                <Col>
                                    <h3>{row.exercise}</h3>
                                </Col>
                                <Col className="text align right">
                                    <Button variant="danger" size="sm" onClick={this.handleRemoveExercise} data-idx={index}>Delete</Button>
                                </Col>
                            </Row>
        
                            <Table className="exercise-volum-table" striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Preview</th>
                                        <th className="text align center">Set</th>
                                        <th className="text align center">Weight(kg)</th>
                                        <th className="text align center">Reps</th>
                                        <th className="text align center">RIR</th>
                                        <th className="text align center"></th>
                                        <th className="text align center"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        row.sets.map( ( set, i ) => {
                                            return (
                                                <tr key={i}>
                                                    <td >
                                                        {set.set}Set
                                                        &nbsp;&#47;&nbsp;
                                                        {set.weight}Kg
                                                        &nbsp;&#47;&nbsp;
                                                        {set.reps}Reps
                                                        { ! set.disableRange ? '~' + set.maxReps + 'Reps' : '' }
                                                        &nbsp;&#47;&nbsp;
                                                        {set.rir}RIR
                                                    </td>
                                                    <td width={50} className="text align center">{set.set}</td>
                                                    <td width={100} className="text align center">{set.weight}</td>
                                                    <td width={80} className="text align center">{set.reps}{ ! set.disableRange ? '~' + set.maxReps : '' }</td>
                                                    <td width={50} className="text align center">{set.rir}</td>
                                                    <td width={50} className="text align center">
                                                        <Button
                                                            variant="outline-info"
                                                            size="sm"
                                                            onClick={this.handleEditSet}
                                                            data-exercise={index}
                                                            data-set={i}
                                                            data-weight={set.weight}
                                                            data-reps={set.reps}
                                                            data-maxreps={set.maxReps}
                                                            data-disablerange={set.disableRange}
                                                            data-rir={set.rir}
                                                        >Edit</Button>
                                                    </td>
                                                    <td width={50} className="text align center">
                                                        <Button
                                                            variant="outline-danger"
                                                            size="sm"
                                                            onClick={this.handleRemoveSet}
                                                            data-idx={i}
                                                            data-exercise={index}>X</Button>
                                                    </td>
                                                </tr>
                                            )
                                        } )
                                    }
                                </tbody>
        
                            </Table>
        
                        </Container>
                    )
                } ) }

                <EditSetModal
                    data={this.state.editSetData}
                    handleChild={this.props.handleChild}
                    handleModal={this.handleModal}
                    is_modal={this.state.is_modal} />

            </div> //.container
        )
    }

}

export default ExerciseList
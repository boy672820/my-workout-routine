import React, { Component } from 'react'
import {
    Form,
    Button,
    Col,
    Modal
} from 'react-bootstrap'


class EditSetModal extends Component {

    state = { is_derived: false, disableRange: true, reps: 1, maxReps: 1 }

    // Init state to props.
    static getDerivedStateFromProps( nextProps, prevState ) {
        // if ( ! prevState.is_derived ) { // Check init.
            return {
                // is_derived: true,
                disableRange: nextProps.data.disablerange ? 1 : 0,
                reps: nextProps.data.reps,
                maxReps: nextProps.data.maxreps
            }
        // }

        return null
    }

    handleReps = ( e ) => {
        const value = Number( e.target.value ),
              update = { reps: value }

        // maxReps increase value.
        let increase = 2

        switch ( value ) {
            case 100:
                increase = 0
                break

            case 99:
                increase = 1
                break

            default:
                increase = 2
                break
        }

        update[ 'maxReps' ] = value + increase

        // Update current state.
        this.setState( update )
    }

    handleMaxReps = ( e ) => {
        const value = Number( e.target.value ),
              update = { maxReps: value }

        // reps decrease value.
        let decrease = 2

        switch ( value ) {
            case 1:
                decrease = 0
                break

            case 2:
                decrease = 1
                break

            default:
                decrease = 2
                break
        }
    
        update[ 'reps' ] = value - decrease

        // Update current state.
        this.setState( update )
    }

    handleCheckbox = ( e ) => {
        const checked = e.target.checked,
              update = { disableRange: !checked }

        // Update current state.
        this.setState( update )
    }
    
    handleEditSet = ( e ) => {
        e.preventDefault()
    }

    render() {
        return (

            <Modal show={this.props.is_modal} onHide={this.props.handleModal}>

                <Form onSubmit={this.handleEditSet}>

                    <Modal.Header closeButton>
                        <Modal.Title>Edit set</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form.Group>
                            <Form.Label htmlFor="edit-weight">Weight</Form.Label>
                            <Form.Control type="text" id="edit-weight" name="edit-weight" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="edit-Reps">Reps</Form.Label>

                            <Form.Row className="align-items-center">

                                <Col xs="auto">
                                    <Form.Control
                                        as="select"
                                        name="edit-reps"
                                        id="edit-reps"
                                        onChange={this.handleReps}
                                        value={this.state.reps}
                                    >
                                        { [ ...Array( 100 ) ].map( ( n, index ) => {
                                            return (
                                                <option
                                                    value={index + 1}
                                                    key={index}
                                                >{index + 1}</option>
                                            )
                                        } ) }
                                    </Form.Control>
                                    <Form.Text>Default reps.</Form.Text>
                                </Col>

                                <Col xs="auto">
                                    <Form.Check
                                        type="checkbox"
                                        id="edit-rep-range-enable"
                                        label="Enable range."
                                        onChange={this.handleCheckbox}
                                    />
                                </Col>

                                <Col xs="auto">
                                    <Form.Control
                                        as="select"
                                        name="edit-maxReps"
                                        id="edit-maxReps"
                                        disabled={this.state.disableRange}
                                        onChange={this.handleMaxReps}
                                        value={this.state.maxReps}
                                    >
                                        {[...Array(100)].map((n, index) => {
                                            return (
                                                <option key={index}>{index + 1}</option>
                                            )
                                        })}
                                    </Form.Control>
                                    <Form.Text>Maximum reps.</Form.Text>
                                </Col>

                            </Form.Row>

                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="edit-rir">RIR(Reps In Reserve)</Form.Label>
                            <Form.Control as="select" id="edit-rir" name="edit-rir">
                                {
                                    [ ...Array( 10 ) ].map( ( n, i ) => {
                                        return (
                                            <option key={i} value={i}>{i}</option>
                                        )
                                    } )
                                }
                            </Form.Control>
                        </Form.Group>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleModal}>Close</Button>
                        <Button type="submit" variant="primary">Save Changes</Button>

                    </Modal.Footer>

                </Form>

            </Modal>

        )
    }
}

export default EditSetModal
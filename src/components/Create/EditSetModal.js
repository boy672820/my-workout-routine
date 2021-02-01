import React, { Component } from 'react'
import {
    Form,
    Button,
    Col,
    Modal,
    InputGroup,
    ButtonGroup,
    ToggleButton
} from 'react-bootstrap'


class EditSetModal extends Component {

    state = {
        is_derived: false, // Check init.
        plate_weight: 2.5,
        // Form state.
        exercise_idx: null,
        set_idx: null,
        reps: 1,
        maxReps: 1,
        disableRange: true,
        weight: 0,
        rir: 0
    }

    // Init state to props.
    static getDerivedStateFromProps( props, state ) {
        // Initial init when open modal.
        if ( props.is_modal && ! state.is_derived  ) {
            return {
                is_derived: true,
                exercise_idx: props.data.exercise_idx,
                set_idx: props.data.set_idx,
                reps: props.data.reps,
                maxReps: props.data.maxReps,
                disableRange: props.data.disableRange,
                weight: props.data.weight,
                rir: props.data.rir
            }
        }
        // Return initial when close modal.
        else if ( ! props.is_modal && state.is_derived ) {
            return {
                is_derived: false,
                exercise_idx: null,
                set_idx: null,
                reps: 1,
                maxReps: 1,
                disableRange: true,
                weight: 0,
                rir: 0
            }
        }
        return null
    }

    /**
     * Control reps.
     * @param {*} e 
     */
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

    /**
     * Control maxReps.
     * @param {*} e 
     */
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

    /**
     * control the disable range.
     * @param {*} e 
     */
    handleCheckbox = ( e ) => {
        const checked = e.target.checked,
              update = { disableRange: !checked }

        // Update current state.
        this.setState( update )
    }

    /**
     * Weight toggle button component.
     */
    RadioToggleButton = () => {
        const radios = [
            { name: '2.5kg', value: 2.5 },
            { name: '5kg', value: 5 },
            { name: '10kg', value: 10 },
            { name: '15kg', value: 15 },
            { name: '20kg', value: 20 },
            { name: '25kg', value: 25 }
        ]
    
        return (
            <ButtonGroup toggle>
                {
                    radios.map( ( radio, index ) => (
                        <ToggleButton
                            key={ index }
                            type="radio"
                            variant="secondary"
                            name="weight-increase-value"
                            value={ radio.value }
                            checked={ this.state.plate_weight === radio.value }
                            onChange={ ( e ) => this.setState( { plate_weight: Number( e.target.value ) } ) }
                        >
                            { radio.name }
                        </ToggleButton>
                    ) )
                }
            </ButtonGroup>
        )
    }

    /**
     * Increase and decrease to weight value.
     * @param {*} e 
     */
    handleInreaseButton = ( e ) => {
        const calc = e.target.dataset.calc
        
        const calc_weight = Number( this.state.plate_weight ) * calc,
              state_weight = this.state.weight

        let res = state_weight + calc_weight

        if ( res <= 0 ) res = 0

        // Control component from this.
        this.setState( {
            weight: res
        } )
    }

    /**
     * Control weight.
     * @param {*} e 
     */
    handleWeight = ( e ) => {
        const value = Number( e.target.value )

        const ref = this.weightRef

        // Check NaN.
        if ( isNaN( value ) ) {
            ref.querySelector( '#edit-weight' ).style.borderColor = 'red'
            ref.querySelector( '#valid-edit-weight' ).style.display = 'block'

            return false
        }
        else {
            ref.querySelector( '#edit-weight' ).style.borderColor = '#ced4da'
            ref.querySelector( '#valid-edit-weight' ).style.display = 'none'
        }

        this.setState( {
            weight: value
        } )
    }

    /**
     * Control rir.
     * @param {*} e 
     */
    handleRir = ( e ) => {
        const value = Number( e.target.value )

        this.setState( {
            rir: value
        } )
    }

    /**
     * Submit edit.
     * @param {*} e 
     */
    handleSubmit = ( e ) => {
        const update = this.props.exerciseListData.slice()
        const updateItem = update[ this.state.exercise_idx ].sets[ this.state.set_idx ]

        updateItem.weight = this.state.weight
        updateItem.reps = this.state.reps
        updateItem.maxReps = this.state.maxReps
        updateItem.disableRange = this.state.disableRange
        updateItem.rir = this.state.rir
        
        this.props.handleChild( update )

        this.props.handleModal()
        
        e.preventDefault()
    }

    render() {
        return (

            <Modal show={this.props.is_modal} onHide={this.props.handleModal}>

                <Form onSubmit={this.handleSubmit}>

                    <Modal.Header closeButton>
                        <Modal.Title>Edit set</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Form.Group ref={ ( ref ) => this.weightRef = ref }>
                            <Form.Label htmlFor="edit-weight">Weight</Form.Label>

                            <Form.Group>
                                <this.RadioToggleButton />
                            </Form.Group>

                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Button variant="outline-secondary" onClick={this.handleInreaseButton} data-calc={-1}>-</Button>
                                </InputGroup.Prepend>

                                <Form.Control
                                    type="text"
                                    id="edit-weight"
                                    name="edit-weight"
                                    onChange={this.handleWeight}
                                    value={this.state.weight}
                                />

                                <InputGroup.Append>
                                    <Button variant="outline-secondary" onClick={this.handleInreaseButton} data-calc={1}>+</Button>
                                </InputGroup.Append>
                            </InputGroup>

                            <Form.Text id="valid-edit-weight" className="text-muted" style={ { display: 'none' } }>
                                <span style={ { color: 'red' } }>
                                    Only enter number.
                                </span>
                            </Form.Text>

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
                                        checked={!this.state.disableRange}
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
                            <Form.Control
                                as="select"
                                id="edit-rir"
                                name="edit-rir"
                                onChange={this.handleRir}
                                value={this.state.rir}
                            >
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
import React, { Component } from 'react'
import {
    Form,
    Col
} from 'react-bootstrap'


class RepsControl extends Component {

    state = {
        disableRange: this.props.defaultValue.disableRange,
        reps: this.props.defaultValue.reps,
        maxReps: this.props.defaultValue.maxReps
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

        // Update parent state.
        this.props.handleChild( update )
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

        // Update parent state.
        this.props.handleChild( update )
    }

    handleCheckbox = ( e ) => {
        const checked = e.target.checked,
              update = { disableRange: !checked }

        // Update current state.
        this.setState( update )

        /**
         * Update current state.
         * If not checked, returns 0.
         */
        this.props.handleChild( update )
    }

    render() {
        return (
            <Form.Group>

                <Form.Label htmlFor="reps">Reps</Form.Label>

                <Form.Row className="align-items-center">

                    <Col xs="auto">
                        <Form.Control
                            as="select"
                            name="reps"
                            id="reps"
                            onChange={this.handleReps}
                            value={this.state.reps}
                            ref={this.props.controlRef}
                        >
                            {[...Array(100)].map((n, index) => {
                                return (
                                    <option key={index}>{index + 1}</option>
                                )
                            })}
                        </Form.Control>
                        <Form.Text>Default reps.</Form.Text>
                    </Col>

                    <Col xs="auto">
                        <Form.Check
                            type="checkbox"
                            id="rep-range-enable"
                            label="Enable range."
                            onChange={this.handleCheckbox}
                            ref={ ( ref ) => this.checkboxRef = ref }
                        />
                    </Col>

                    <Col xs="auto">
                        <Form.Control
                            as="select"
                            name="maxReps"
                            id="maxReps"
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
        )
    }
}

export default RepsControl
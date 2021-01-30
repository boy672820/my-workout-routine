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

        // Disable the range checkbox when Reps is the maximum.
        if ( value <= 100 )
            this.checkboxRef.disabled = true

        // When reps is higher than the maxReps.
        if ( value >= this.state.maxReps )
            update[ 'maxReps' ] = value + 2

        // Update current state.
        this.setState( update )

        // Update parent state.
        this.props.handleChild( update )
    }

    handleMaxReps = ( e ) => {
        const value = Number( e.target.value ),
              update = { maxReps: value }

        // When reps is higher than the maxReps.
        if ( value <= this.state.reps )
            update[ 'reps' ] = value - 2

        // Update current state.
        this.setState( update )

        // Update parent state.
        this.props.handleChild( update )
    }

    handleCheckbox = ( e ) => {
        const checked = e.target.checked,
              update = { disableRange: !checked }

        // When reps is higher than the maxReps.
        if ( this.state.reps >= this.state.maxReps )
            update[ 'maxReps' ] = this.state.reps + 2

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
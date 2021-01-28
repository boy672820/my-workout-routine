import React, { Component } from 'react'
import {
    Form,
    Col
} from 'react-bootstrap'


class RepsControl extends Component {

    state = {
        disableRange: true,
        defaultReps: 1,
        maxReps: 0
    }

    handleDefaultReps = ( e ) => {
        const value = Number( e.target.value ),
              update = { defaultReps: value }

        if ( value >= this.state.maxReps ) update[ 'maxReps' ] = value + 2

        this.setState( update )
    }

    handleMaxReps = ( e ) => {
        const value = Number( e.target.value )

        this.setState( {
            maxReps: value
        } )
    }

    handleCheckbox = ( e ) => {
        const checked = e.target.checked

        this.setState( {
            disableRange: !checked,
            maxReps: ( this.state.defaultReps + 2 )
        } )
    }

    render() {
        return (
            <Form.Group>

                <Form.Label htmlFor="reps">Reps</Form.Label>

                <Form.Row className="align-items-center">

                    <Col xs="auto">
                        <Form.Control as="select" name="defaultReps" id="defaultReps" onChange={this.handleDefaultReps}>
                            {[...Array(100)].map((n, index) => {
                                return (
                                    <option key={index}>{index + 1}</option>
                                )
                            })}
                        </Form.Control>
                        <Form.Text>Default reps.</Form.Text>
                    </Col>

                    <Col xs="auto">
                        <Form.Check type="checkbox" id="rep-range-enable" label="Enable range." onChange={this.handleCheckbox} />
                    </Col>

                    <Col xs="auto">
                        <Form.Control as="select" name="maxReps" id="maxReps" disabled={this.state.disableRange} onChange={this.handleMaxReps} value={this.state.maxReps}>
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
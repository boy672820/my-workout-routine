import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

class ExerciseControl extends Component {

    state = {
        exercise: this.props.defaultValue
    }

    handleChange = ( e ) => {
        const value = e.target.value

        // Check form control in state.
        this.props.validate( 'exercise', value )

        // Update state this.
        this.setState( {
            exercise: value
        } )

        // Update state parent.
        this.props.handleChild( {
            exercise: value
        } )
    }

    render() {
        return (
            <Form.Group ref={this.props.controlRef}>
                <Form.Label>Exercise</Form.Label>
                <Form.Control
                    type="text"
                    id="exercise"
                    title="Please enter your exercise."
                    placeholder="Please enter your exercise."
                    onChange={this.handleChange}
                    value={this.state.exercise} />
                
                <Form.Text id="valid-exercise" className="text-muted" style={ { display: 'none' } }>
                    <span style={ { color: 'red' } }>
                        Please enter your exercise.
                    </span>
                </Form.Text>
            </Form.Group>
        )
    }
}

export default ExerciseControl
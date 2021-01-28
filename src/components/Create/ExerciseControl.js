import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

class ExerciseControl extends Component {

    state = {
        exercise: this.props.defaultValue
    }

    handleChange = ( e ) => {
        const value = e.target.value

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
            <Form.Group>
                <Form.Label>Exercise</Form.Label>
                <Form.Control type="text" placeholder="Enter exercise." onChange={this.handleChange} value={this.state.exercise} />
            </Form.Group>
        )
    }
}

export default ExerciseControl
import React, { Component } from 'react'
import {
    Button,
    Form,
    Card
} from 'react-bootstrap'

import ExerciseControl from './ExerciseControl'
import WeightControl from './WeightControl'
import SetsControl from './SetsControl'
import RepsControl from './RepsControl'
import ExerciseList from './ExerciseList'

import './create.css'


class Create extends Component {


    state = {
        // The form data of create exercise.
        exercise: '',
        weight: 10,
        sets: 1,
        reps: 1,
        maxReps: 0,
        disableRange: true,
        // The result list of create form.
        exerciseList: []
    }


    /**
     * Control from child component.
     * @param {Object} res
     */
    handleChild = ( res ) => {
        this.setState( res );
    }


    /**
     * Handle submit.
     * @param {*} e 
     */
    handleSubmit = ( e ) => {
        const update = Object.assign( {}, this.state ) // Copy state object.

        // Remove exerciseList element of update.
        delete update.exerciseList

        // Update this state.
        this.setState( prevState => ( {
            // Add element from exerciseList state.
            exerciseList: [
                ...prevState.exerciseList, update
            ]
        } ) )

        e.preventDefault()
    }


    render() {

        return (

            <div className="create-container">

                <div className="container">

                    <Card>
                        <Card.Body>

                            <h2>Create routine</h2>

                            <Form onSubmit={this.handleSubmit}>

                                <ExerciseControl defaultValue={this.state.exercise} handleChild={this.handleChild} />

                                <WeightControl defaultValue={this.state.weight} handleChild={this.handleChild} />

                                <SetsControl defaultValue={this.state.sets} handleChild={this.handleChild} />

                                <RepsControl
                                    defaultValue={
                                        {
                                            reps: this.state.reps,
                                            maxReps: this.state.maxReps,
                                            disableRange: this.state.disableRange
                                        }
                                    }
                                    handleChild={this.handleChild} />

                                <Button variant="primary" type="submit">Submit</Button>

                            </Form>

                        </Card.Body>
                    </Card>
                </div>

                <ExerciseList data={this.state.exerciseList} />

            </div> //.create-container

        )
    }
}

export default Create
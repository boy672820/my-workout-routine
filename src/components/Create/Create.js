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
import RirControl from './RirControl'
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
        rir: 0,
        // The result list of create form.
        exerciseList: [
            {
                exercise: 'Squat',
                sets: [
                    { set: 1, weight: 85, reps: 8, maxReps: 10, disableRange: false, rir: 2 },
                    { set: 2, weight: 85, reps: 8, maxReps: 10, disableRange: false, rir: 2 },
                    { set: 3, weight: 85, reps: 8, maxReps: 10, disableRange: false, rir: 2 },
                    { set: 4, weight: 85, reps: 8, maxReps: 10, disableRange: false, rir: 2 }
                ]
            },
            {
                exercise: 'Hip thrust',
                sets: [
                    { set: 1, weight: 50, reps: 10, maxReps: 12, disableRange: false, rir: 2 },
                    { set: 2, weight: 50, reps: 10, maxReps: 12, disableRange: false, rir: 2 },
                    { set: 3, weight: 50, reps: 10, maxReps: 12, disableRange: false, rir: 2 },
                    { set: 4, weight: 50, reps: 10, maxReps: 12, disableRange: false, rir: 2 }
                ]
            },
            {
                exercise: 'Leg curl',
                sets: [
                    { set: 1, weight: 60, reps: 12, maxReps: 14, disableRange: false, rir: 2 },
                    { set: 2, weight: 60, reps: 12, maxReps: 14, disableRange: false, rir: 2 },
                    { set: 3, weight: 60, reps: 12, maxReps: 14, disableRange: false, rir: 2 },
                    { set: 4, weight: 60, reps: 12, maxReps: 14, disableRange: false, rir: 2 }
                ]
            },
            {
                exercise: 'Calves',
                sets: [
                    { set: 1, weight: 55, reps: 13, maxReps: 15, disableRange: false, rir: 2 },
                    { set: 2, weight: 55, reps: 13, maxReps: 15, disableRange: false, rir: 2 },
                    { set: 3, weight: 55, reps: 13, maxReps: 15, disableRange: false, rir: 2 },
                    { set: 4, weight: 55, reps: 13, maxReps: 15, disableRange: false, rir: 2 }
                ]
            },
            {
                exercise: 'Barbel curl',
                sets: [
                    { set: 1, weight: 20, reps: 10, maxReps: 12, disableRange: false, rir: 2 },
                    { set: 2, weight: 20, reps: 10, maxReps: 12, disableRange: false, rir: 2 },
                    { set: 3, weight: 20, reps: 10, maxReps: 12, disableRange: false, rir: 2 },
                    { set: 4, weight: 20, reps: 10, maxReps: 12, disableRange: false, rir: 2 }
                ]
            },
            {
                exercise: 'Lying triceps extension',
                sets: [
                    { set: 1, weight: 20, reps: 12, maxReps: 14, disableRange: false, rir: 2 },
                    { set: 2, weight: 20, reps: 12, maxReps: 14, disableRange: false, rir: 2 },
                    { set: 3, weight: 20, reps: 12, maxReps: 14, disableRange: false, rir: 2 },
                    { set: 4, weight: 20, reps: 12, maxReps: 14, disableRange: false, rir: 2 }
                ]
            },
            {
                exercise: 'Reverse back extension',
                sets: [
                    { set: 1, weight: 0, reps: 15, maxReps: 0, disableRange: true, rir: 0 },
                    { set: 2, weight: 0, reps: 15, maxReps: 0, disableRange: true, rir: 0 },
                    { set: 3, weight: 0, reps: 15, maxReps: 0, disableRange: true, rir: 0 },
                ]
            }
        ]
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
        e.preventDefault()

        // Form validation.
        if ( ! this.formValidation() ) return;

        // Copy state object.
        const data = Object.assign( {}, this.state )

        // Remove exerciseList element in data.
        delete data.exerciseList

        // Create state data.
        const update = {
            exercise: data.exercise,
            sets: []
        }

        let i = 1
        // Set standard.
        for ( i; i <= data.sets; i += 1 ) {
            update.sets.push( {
                set: i,
                weight: data.weight,
                reps: data.reps,
                maxReps: data.maxReps,
                disableRange: data.disableRange,
                rir: data.rir
            } )
        }

        // Update this state.
        this.setState( prevState => ( {
            // Add element from exerciseList state.
            exerciseList: [
                ...prevState.exerciseList, update
            ]
        } ) )
    }


    /**
     * Check form validation.
     */
    formValidation = () => {
        const state = this.state

        // Checked to be form controls.
        const targets = Object.entries( {
                            exercise: this.exerciseRef,
                            weight: this.weightRef,
                            sets: this.setsRef,
                            reps: this.repsRef
                        } )

        // Results of validation.
        let res = true

        // Check form control in state.
        for ( const [ key, ref ] of targets ) {
            const state_target = state[ key ]

            // Check null.
            if ( ! state_target ) {
                const input = ref.querySelector( '#' + key ), // Form control.
                      message = ref.querySelector( '#valid-' + key ) // Worning message.

                input.style.borderColor = 'red'
                message.style.display = 'block'

                // Validation failed.
                res = false
            }
        }

        return res
    }


    /**
     * Dynamic validation.
     * @param {*} key Ref prefix name.
     * @param {*} value Value to check.
     */
    CheckedForm = ( key, value ) => {
        // Check state.
        if ( ! value ) return false

        const ref = this[ key + 'Ref' ]
        const refInput = ref.querySelector( '#' + key )
        const refMessage = ref.querySelector( '#valid-' + key )

        refInput.style.borderColor = '#ced4da'
        refMessage.style.display = 'none'

        return true
    }


    render() {

        return (

            <div className="create-container">

                <div className="container">

                    <Card>
                        <Card.Body>

                            <h2>Create routine</h2>

                            <Form onSubmit={this.handleSubmit}>

                                <ExerciseControl
                                    defaultValue={this.state.exercise}
                                    handleChild={this.handleChild}
                                    controlRef={ ( ref ) => this.exerciseRef = ref }
                                    validate={this.CheckedForm} />

                                <WeightControl
                                    defaultValue={this.state.weight}
                                    handleChild={this.handleChild}
                                    controlRef={ ( ref ) => this.weightRef = ref }
                                    validate={this.CheckedForm} />

                                <SetsControl
                                    defaultValue={this.state.sets}
                                    handleChild={this.handleChild}
                                    controlRef={ ( ref ) => this.setsRef = ref }
                                    validate={this.CheckedForm} />

                                <RepsControl
                                    defaultValue={
                                        {
                                            reps: this.state.reps,
                                            maxReps: this.state.maxReps,
                                            disableRange: this.state.disableRange
                                        }
                                    }
                                    handleChild={this.handleChild}
                                    controlRef={ ( ref ) => this.repsRef = ref } />

                                <RirControl
                                    defaultValue={this.state.rir}
                                    handleChild={this.handleChild} />

                                <Button variant="primary" type="submit">Submit</Button>

                            </Form>

                        </Card.Body>
                    </Card>
                </div>

                <ExerciseList data={this.state.exerciseList} handleChild={this.handleChild} />

            </div> //.create-container

        )
    }
}

export default Create
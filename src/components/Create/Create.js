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
        e.preventDefault()

        // Form validation.
        if ( ! this.formValidation() ) return;

        // Copy state object.
        const update = Object.assign( {}, this.state )

        // Remove exerciseList element of update.
        delete update.exerciseList

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
                            reps: this.repsRef,
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
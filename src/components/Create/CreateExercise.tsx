import React, { Component } from 'react'

import {
    CreatePropsInterface,
    CreateStateInterface
} from './create.interface'
import CreateEditSetModal from './CreateEditSetModal'
import CreateExerciseModal from './CreateExerciseModal'
import CreateRemoveExerciseModal from './CreateRemoveExerciseModal'
import { RoutineAPI } from '../../api/routine/routine.api'

import './create.css'
import CreateExerciseList from './CreateExerciseList'
import CreateExerciseBlockTitle from './CreateExerciseBlockTitle'


class CreateExercise extends Component<CreatePropsInterface, CreateStateInterface> {

    constructor( props: CreatePropsInterface ) {
        super( props )

        const { block_id } = props.match.params

        this.state = {
            // UI/UX state.
            create_modal: false,
            weight_plate: 20,
            remove_exercise_modal: false,

            // Remove state.
            remove_exercise_name: '',
            remove_exercise_id: null,

            // Create exercise state.
            block_id: Number( block_id ),
            exercise_name: '',
            set_number: 3,
            set_weight: 0,
            set_reps: 8,
            set_max_reps: 10,
            set_disable_range: true,
            set_rir: 0,
            set_rest_minute: 1,
            set_rest_second: 30,

            // Edit set state.
            edit_set_modal: false,
            edit_exercise_name: '',
            edit_ID: -1,
            edit_exercise_id: -1,
            edit_set_number: -1,
            edit_set_reps: -1,
            edit_set_max_reps: -1,
            edit_set_disable_range: 0,
            edit_set_weight: -1,
            edit_set_rir: -1,
            edit_set_rest_minute: -1,
            edit_set_rest_second: -1,

            // Create set state.
            create_set_exercise_name: '',
            create_set_exercise_id: -1,
            create_set_reps: 1,
            create_set_max_reps: 2,
            create_set_disable_range: true,
            create_set_weight: 0,
            create_set_rir: 0,
            create_set_rest_minute: 1,
            create_set_rest_second: 30,

            // Getting state.
            exerciseData: []
        }

        /** Bind events */

        this.validateForm = this.validateForm.bind( this )

        /** Create exercise events. */
        this.handleRange = this.handleRange.bind( this )
        this.handlePlateToggle = this.handlePlateToggle.bind( this )
        this.handleForm = this.handleForm.bind( this )
        this.handleIncrement = this.handleIncrement.bind( this )
        this.handleIncreaseWeight = this.handleIncreaseWeight.bind( this )
        this.handleCreateModal = this.handleCreateModal.bind( this )

        /** Remove exercise events. */
        this.handleRemoveExerciseModal = this.handleRemoveExerciseModal.bind( this )

        /** Edit set event. */
        this.handleEditSetModal = this.handleEditSetModal.bind( this )
    }

    // Refs.
    private exerciseRef = React.createRef<any>()

    /**
     * componentDidMount.
     */
    componentDidMount() {
        const { block_id } = this.state

        // Get exercises.
        RoutineAPI.getExercises( block_id ).then( response => {
            this.setState( {
                exerciseData: response.data
            } )
        } )
    }

    /**
     * Handle edit set modal.
     */
    async handleEditSetModal() {
        const { edit_set_modal } = this.state

        this.setState( {
            edit_set_modal: ! edit_set_modal,
        } )
    }

    /**
     * Handle remove exercise modal.
     */
    async handleRemoveExerciseModal() {
        const { remove_exercise_modal } = this.state

        this.setState( {
            remove_exercise_modal: ! remove_exercise_modal
        } )
    }

    /**
     * Handle create modal.
     */
    async handleCreateModal() {
        const { create_modal } = this.state

        this.setState( { create_modal: !create_modal } )
    }

    /**
     * Handle disable range.
     * @param e Change event from form control.
     */
    async handleRange( e: React.ChangeEvent<HTMLInputElement>, prefix?: string ) {
        const is_prefix = prefix ? prefix : ''
        const { checked } = e.target

        this.setState( {
            [ `${is_prefix}set_disable_range` ]: !checked
        } )
    }

    /**
     * Select weight increment and decrement value.
     * @param e Change event from form control.
     */
    async handlePlateToggle( e: React.ChangeEvent<HTMLInputElement> ) {
        const { value } = e.target

        this.setState( {
            weight_plate: Number( value )
        } )
    }

    /**
     * Handle increment or decrement to button of weight.
     * @param i 
     */
    async handleIncreaseWeight( i: number, prefix?: string ) {
        const is_prefix = prefix ? prefix : ''
        const increment = this.state.weight_plate * i
        let value = Number( this.state[ `${is_prefix}set_weight` ] ) + increment

        const update = await this.validateForm( `${is_prefix}set_weight`, value, is_prefix )

        this.setState( update )
    }

    /**
     * Handle increment or decrement to button.
     * @param target_name State name.
     * @param i Increment value.
     * @param prefix Use prefix to give it unique name.
     */
    async handleIncrement( target_name: string, i: number, prefix?: string ) {
        const value = this.state[ target_name ]
        let increment_value = Number( value ) + i

        const update = await this.validateForm( target_name, increment_value, prefix ? prefix : '' )
    
        this.setState( update )
    }

    /**
     * Handle form control.
     * @param e Change event from form control.
     */
    async handleForm( e: React.ChangeEvent<HTMLInputElement>, prefix: string ) {

        const { name, value } = e.target

        const update = this.validateForm( name, value, prefix )

        this.setState( await update )
    }

    /**
     * Validate form.
     * @param name 
     * @param value 
     * @param prefix 
     */
    async validateForm( name: string, value: string | number, prefix: string ): Promise<any> {
        const res: CreateStateInterface = { ...this.state }

        const validNumber = async ( value: any, default_value: number ) => {
            const number_value = Number( value )
            let res = number_value

            if ( isNaN( number_value ) ) res = default_value
            else if ( number_value < default_value ) res = default_value

            return res
        }

        switch( name ) {
            // Valid exercise_name
            case `${prefix}exercise_name`:
                if ( value )
                    this.exerciseRef.current.style.border = '1px solid #ced4da'

                res[ name ] = value
            break

            // Valid number.
            case `${prefix}set_number`:
                    const number_value = await validNumber( value, 1 )
                res[ name ] = number_value
            break

            // Valid set_rest_second
            case `${prefix}set_rir`:
                const rir_value = await validNumber( value, 0 )
                res[ name ] = rir_value
            break
            
            // Valid set_rest_second
            case `${prefix}set_rest_minute`:
            case `${prefix}set_rest_second`:
                const rest_value = await validNumber( value, 0 )
                res[ name ] = rest_value
            break

            // Valid set_weight
            case `${prefix}set_weight`:
                const weight_value = await validNumber( value, 0 )
                res[ name ] = weight_value
            break

            // Valid set_reps
            case `${prefix}set_reps`:
                // Validate value and set value from reps.
                let reps_value = await validNumber( value, 1 )
                res[ name ] = reps_value

                const max_reps = this.state[ `${prefix}set_max_reps` ]! as number

                // Increase max_reps when reps is higher than max_reps.
                if ( max_reps <= reps_value )
                    res[ `${prefix}set_max_reps` ] = reps_value + 1
            break

            // Valid set_max_reps
            case `${prefix}set_max_reps`:
                // Validate value and set value from max_reps.
                let max_reps_value = await validNumber( value, 2 )
                res[ name ] = max_reps_value

                const reps = this.state[ `${prefix}set_reps` ]! as number

                // Decrease reps when max_reps lower than reps.
                if ( reps >= max_reps_value )
                    res[ `${prefix}set_reps` ] = max_reps_value - 1

            break
        }

        return res
    }

    render() {
        return (
            <main className="create-main">
                <CreateExerciseBlockTitle block_id={ this.state.block_id } history={ this.props.history } />

                {/** Exercise list. */}
                <CreateExerciseList parent={ this } />

                {/** Edit set modal. */}
                <CreateEditSetModal parent={ this } prefix="edit_" />

                {/** Create exercise modal. */}
                <CreateExerciseModal parent={ this } prefix="" />

                {/** Remove exercise modal. */}
                <CreateRemoveExerciseModal parent={ this } />

            </main>
        )
    }
}

export default CreateExercise
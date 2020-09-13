import React, {Component} from 'react'
import Modal from './Modal'
import './post.css'

const ROUTINES = [
    {
        index: 1,
        exercise: 'Squat',
        sets: [
            { set: 1, reps: 10, weight: 150 },
            { set: 2, reps: 9, weight: 150 },
            { set: 3, reps: 9, weight: 145 },
            { set: 4, reps: 8, weight: 140 },
            { set: 5, reps: 8, weight: 135 },
        ],
        memo: 'Shut up and Squat!'
    },
    {
        index: 2,
        exercise: 'Deadlift',
        sets: [
            { set: 1, reps: 6, weight: 180 },
        ],
        memo: 'This exercise is Deadlift.'
    },
    {
        index: 3,
        exercise: 'Steaf-Leg Deadlift',
        sets: [
            { set: 1, reps: 12, weight: 90 },
            { set: 2, reps: 12, weight: 90 },
            { set: 3, reps: 12, weight: 90 },
            { set: 4, reps: 12, weight: 90 },
        ],
        memo: 'Stop set.'
    },
]


class Form extends Component {

    state = {
        index: 0,
        set: 0,
        reps: 0,
        weight: 0,
    }

    handleChange = ( e ) => {
        const { name, value } = e.target

        this.setState( {
            [ name ]: value
        } )
    }

    handleSubmit = ( e ) => {
        e.preventDefault()

        this.props.updateData( this.state )
    }

    updateFormData = ( data ) => {
        const { index, set, reps, weight } = data

        this.setState( {
            index: index,
            set: set,
            reps: reps,
            weight: weight
        } )
    }

    removeForm = () => {
        this.props.handleModal( false )

        this.setState( { index: 0, set: 0, reps: 0, weight: 0 } )
    }

    render() {
        return (
            <div className="form-container">
                <form action="#" method="post" id="form-set" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <p>
                            <label htmlFor="reps">Reps</label>
                            <input type="text" name="reps" id="reps" value={this.state.reps} onChange={this.handleChange} />
                        </p>
                        <p>
                            <label htmlFor="weight">Weight</label>
                            <input type="text" name="weight" id="weight" value={this.state.weight} onChange={this.handleChange} />
                        </p>
                        <button type="submit">update</button>
                    </fieldset>
                </form>
                <p className="close">
                    <button className="close-modal" onClick={this.removeForm}>Close</button>
                </p>
            </div>
        )
    }
}


const ExerciseSet = ( { index, sets, editSet } ) => {
    return(
        <ul className="sets">
            {sets.map(
                ( row, i ) => {

                    return (
                        <li className="set" key={i}>
                            <p className="reps"><span>{row.reps}</span>Reps</p>
                            <p className="weight"><span>{row.weight}</span>Kg</p>
                            <button
                                onClick={editSet}
                                data-index={index}
                                data-set={row.set}
                                data-reps={row.reps}
                                data-weight={row.weight}>1세트 수정</button>
                        </li>
                    )
                }
            )}
        </ul>
    )
}

const ExerciseItem = ( { data, editSet } ) => {
    return (
        <ul className="list">
            {data.map(
                ( row, index ) => {

                    return (
                        <li className="item" key={index}>
                            <div className="main">
                                <h6 className="excercise">{row.exercise}</h6>

                                <ExerciseSet
                                    index={row.index}
                                    sets={row.sets}
                                    editSet={editSet} />

                            </div>

                            <div className="sub">
                                <textarea name="memo" className="memo" defaultValue={row.memo} />
                            </div>
                        </li>
                    )
                }
            )}
        </ul>
    )
}


class Post extends Component {

    state = {
        JSON: ROUTINES,
        modal_display: false,
    }

    handleModal = ( boolean ) => {
        this.setState( { modal_display: boolean } )
    }

    updateData = ( updated ) => {
        const data = this.state.JSON

        const { index, set, reps, weight } = updated

        data[ index - 1 ].sets[ set - 1 ].reps = reps
        data[ index - 1 ].sets[ set - 1 ].weight = weight

        this.setState( { JSON: data } )

        this.handleModal( false )
    }

    editSet = ( e ) => {
        const { index, set, reps, weight } = e.target.dataset
        
        this.setState( { modal_display: true } )

        this.refs.FormComponent.updateFormData( {
            index: index,
            set: set,
            reps: reps,
            weight: weight
        } )
    }

    render() {
        return (
            <div className="post-container">

                <ExerciseItem data={this.state.JSON} editSet={this.editSet} />

                <Modal display={this.state.modal_display}>
                    <Form handleModal={this.handleModal} updateData={this.updateData} ref="FormComponent" />
                </Modal>

            </div>
        )
    }
}

export default Post
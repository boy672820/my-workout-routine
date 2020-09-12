import React, {Component} from 'react'
import Modal from './Modal'
import './post.css'

const ROUTINES = [
    {
        index: 1,
        exercise: 'Squat',
        sets: [
            { set: 1, reps: 10, 'weight': 150 },
            { set: 2, reps: 9, 'weight': 150 },
            { set: 3, reps: 9, 'weight': 145 },
            { set: 4, reps: 8, 'weight': 140 },
            { set: 5, reps: 8, 'weight': 135 },
        ],
        memo: 'Shut up and Squat!'
    },
    {
        index: 2,
        exercise: 'Deadlift',
        sets: [
            { set: 1, reps: 6, 'weight': 180 },
        ],
        memo: 'This exercise is Deadlift.'
    },
    {
        index: 3,
        exercise: 'Steaf-Leg Deadlift',
        sets: [
            { set: 1, reps: 12, 'weight': 90 },
            { set: 2, reps: 12, 'weight': 90 },
            { set: 3, reps: 12, 'weight': 90 },
            { set: 4, reps: 12, 'weight': 90 },
        ],
        memo: 'Stop set.'
    },
]


class Form extends Component {

    state = {
        reps: 0,
        weight: 0,
    }

    handleChange = ( e ) => {
        const { name, value } = e.target

        this.setState( {
            [ name ]: value
        } )
    }

    render() {
        const { reps, weight } = this.props

        console.log( reps, weight )

        return (
            <div className="form-container">
                <form action="#" method="post" id="form-set">
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
                    <button className="close-modal">Close</button>
                </p>
            </div>
        )
    }
}


class Post extends Component {

    state = {
        JSON: ROUTINES,

        modal_display: false,

        formData: { reps: 0, weight: 0, }
    }

    editSet = ( e ) => {
        const { reps, weight } = e.target.dataset

        this.setState( {
            modal_display: true,
            formData: { reps: reps, weight: weight }
        } )
    }

    ExerciseSet = ( {sets } ) => {
        return(
            <ul className="sets">
            {
                sets.map(
                    ( row, i ) => {
    
                        return (
                            <li className="set" key={i}>
                                <p className="reps"><span>{row.reps}</span>Reps</p>
                                <p className="weight"><span>{row.weight}</span>Kg</p>
                                <button
                                    onClick={this.editSet}
                                    data-reps={row.reps}
                                    data-weight={row.weight}>1세트 수정</button>
                            </li>
                        )
    
                    }
                )
            }
            </ul>
        )
    }

    ExerciseItem = ( { data } ) => {
        return (
            <ul className="list">
            {
                data.map(
                    ( row, index ) => {
    
                        return (
                            <li className="item" key={index}>
                                <div className="main">
                                    <h6 className="excercise">{row.exercise}</h6>
    
                                    <this.ExerciseSet
                                        sets={row.sets} />
    
                                </div>
    
                                <div className="sub">
                                    <textarea name="memo" className="memo" defaultValue={row.memo} />
                                </div>
                            </li>
                        )
    
                    }
                )
            }
            </ul>
        )
    }

    render() {
        return (
            <div className="post-container">

                <this.ExerciseItem data={this.state.JSON} />

                <Modal display={this.state.modal_display}>
                    <Form data={this.state.formData} />
                </Modal>

            </div>
        )
    }
}

export default Post
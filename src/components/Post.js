import React, {Component} from 'react'
import Modal from './Modal'
import './post.css'

const ExerciseSet = ( { sets, isModal } ) => {

    return sets.map(
        ( row, index ) => {

            return (
                <li className="set" key={index}>
                    <p className="reps"><span>{row.reps}</span>Reps</p>
                    <p className="weight"><span>{row.weight}</span>Kg</p>
                    <button onClick={isModal} data-reps={row.reps} data-weight={row.weight} data-keep={true}>1세트 수정</button>
                </li>
            )

        }
    )
}

const ExerciseItem = ( { data, isModal } ) => {
    return data.map(
        ( row, index ) => {

            return (
                <li className="item" key={index}>
                    <div className="main">
                        <h6 className="excercise">{row.exercise}</h6>
                        <ul className="sets">
                            <ExerciseSet sets={row.sets} isModal={isModal} />
                        </ul>
                    </div>

                    <div className="sub">
                        <textarea name="memo" className="memo" defaultValue={row.memo} />
                    </div>
                </li>
            )

        }
    )
}

class Post extends Component {

    state = {
        routine: [
            {
                exercise: 'Squat',
                sets: [
                    { reps: 10, 'weight': 150 },
                    { reps: 9, 'weight': 150 },
                    { reps: 9, 'weight': 145 },
                    { reps: 8, 'weight': 140 },
                    { reps: 8, 'weight': 135 },
                ],
                memo: 'Shut up and Squat!'
            },
            {
                exercise: 'Deadlift',
                sets: [
                    { reps: 6, 'weight': 180 },
                ],
                memo: 'This exercise is Deadlift.'
            },
            {
                exercise: 'Steaf-Leg Deadlift',
                sets: [
                    { reps: 12, 'weight': 90 },
                    { reps: 12, 'weight': 90 },
                    { reps: 12, 'weight': 90 },
                    { reps: 12, 'weight': 90 },
                ],
                memo: 'Stop set.'
            },
        ],

        modalDisplay: false,

        formData: {
            reps: '',
            weight: ''
        }
    }

    isModal = ( e ) => {
        const { reps, weight, keep } = e.target.dataset
        
        let modalDisplay = this.state.modalDisplay ? false : true

        if ( keep ) modalDisplay = true

        this.setState( {
            modalDisplay: modalDisplay,
            formData: {
                reps: reps,
                weight: weight
            }
        } )
    }

    render() {
        const { routine } = this.state
    
        return (
            <div className="post-container">
                <ul className="list">
                    <ExerciseItem data={routine} isModal={this.isModal} />
                </ul>

                <Modal display={this.state.modalDisplay} formData={this.state.formData} isModal={this.isModal} />

            </div>
        )
    }
}

export default Post
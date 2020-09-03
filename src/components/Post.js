import React, {Component} from 'react'
import Modal from './Modal'
import './post.css'

const ExerciseSet = ( { sets, index, isModal } ) => {

    return sets.map(
        ( row, i ) => {

            return (
                <li className="set" key={i}>
                    <p className="reps"><span>{row.reps}</span>Reps</p>
                    <p className="weight"><span>{row.weight}</span>Kg</p>
                    <button
                        onClick={isModal}
                        data-index={index}
                        data-set={row.set}
                        data-reps={row.reps}
                        data-weight={row.weight}
                        data-keep={true}>1세트 수정</button>
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
                            <ExerciseSet
                                sets={row.sets}
                                index={row.index}
                                isModal={isModal} />
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
        ],

        modalDisplay: false,

        formData: {
            index: undefined,
            set: undefined,
            reps: undefined,
            weight: undefined
        }
    }

    // Modal activate.
    isModal = ( e ) => {
        const { index, set, reps, weight, keep } = e.target.dataset

        let modalDisplay = this.state.modalDisplay ? false : true

        if ( keep ) modalDisplay = true

        this.setState( {
            modalDisplay: modalDisplay,
            formData: {
                index: index,
                set: set,
                reps: reps,
                weight: weight
            }
        } )
    }

    handleSubmit = ( data ) => {
        
    }

    render() {
        const { routine } = this.state
    
        return (
            <div className="post-container">
                <ul className="list">
                    <ExerciseItem data={routine} isModal={this.isModal} />
                </ul>

                <Modal
                    display={this.state.modalDisplay}
                    isModal={this.isModal}
                    formData={this.state.formData}
                    handleSubmit={this.handleSubmit} />

            </div>
        )
    }
}

export default Post
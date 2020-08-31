import React, {Component} from 'react'
import Modal from './Modal'
import './post.css'

const ExerciseSet = ( props ) => {

    const displayModal = () => {
        document.getElementById( 'modal' ).style.display = 'block'
    }

    return props.set.map(
        ( row, index ) => {

            return (
                <li className="set">
                    <p className="reps"><span>{row.reps}</span>Reps</p>
                    <p className="weight"><span>{row.weight}</span>Kg</p>
                    <button onClick={displayModal}>1세트 수정</button>
                </li>
            )

        }
    )
}

const ExerciseItem = ( props ) => {
    return props.data.map(
        ( row, index ) => {

            return (
                <li className="item" key={index}>
                    <div className="main">
                        <h6 className="excercise">{row.exercise}</h6>
                        <ul className="sets">
                            <ExerciseSet set={row.sets} />
                        </ul>
                    </div>

                    <div className="sub">
                        <textarea name="memo" className="memo">{row.memo}</textarea>
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
        ]
    }

    render() {
        const { routine } = this.state
    
        return (
            <div className="post-container">
                <ul className="list">
                    <ExerciseItem data={routine} />
                </ul>

                <Modal />

            </div>
        )
    }
}

export default Post
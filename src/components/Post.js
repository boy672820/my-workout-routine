import React, {Component} from 'react'
import './post.css'

const ExerciseSet = ( props ) => {
    return props.set.map( ( row, index ) => {
        return (
            <li className="set">
                <p className="reps"><span className="1set-squat-reps">10</span>Reps</p>
                <p className="weight"><span className="1set-squat-weight">150</span>Kg</p>
                <button className="init-current-set 1set-squat-init hidden">1세트 수정</button>
            </li>
        )
    } )
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

    render() {

        const data = [
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
    
        return (
            <div>
                <ul className="list">
                    <ExerciseItem data={data} />
                </ul>
            </div>
        )
    }
}

export default Post
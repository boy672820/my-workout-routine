import React, {Component} from 'react'
import './post.css'

import { Table } from 'react-bootstrap'


class Post extends Component {

    state = {
        exercise: {
            squat: {
                sets: 4,
                weight: 85,
                rir: 2,
                reps: '10-8'
            },
            thrust: {
                sets: 4,
                weight: 52.5,
                rir: 2,
                reps: '12-10'
            }
        }
    }

    ExerciseRecord = () => {
        return (
            <tbody>
                
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        )
    }

    RepRecord = () => {
        return (
            <td>
                <input type="text" name="" id="" className="" defaultValue="" />
                <span></span>
            </td>
        )
    }

    render() {
        return (

            <div className="container">

                <h3>1월 23일</h3>

                <Table striped bordered hover>

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Exercise</th>
                            <th>Set</th>
                            <th>Weight(kg)</th>
                            <th>Rir</th>
                            <th>Reps</th>
                            <th colSpan="4">Rep record</th>
                        </tr>
                    </thead>

                    

                </Table>

            </div>

        )
    }

}

export default Post
import React, {Component} from 'react'
import './create.css'

class Create extends Component {
    render() {
        return (
            <div className="create-container">

                <form action="#" id="create" onsubmit="return false;">
                    <fieldset>
                        <legend>Workout routine</legend>
                        <p>
                            <label for="exercise">Exercise</label>
                            <input type="text" name="exercise" id="exercise" value="" />
                        </p>
                        <div className="set-container">
                            <div className="create set create-set">
                                <div className="inline left">
                                    <p className="inline set-count">1&nbsp;Set</p>
                                </div>
                                <div className="inline right">
                                    <p className="inline">
                                        <input type="text" name="kg" className="set-kg input" value="" /><label for="kg">Kg</label>
                                    </p>
                                    <p className="inline">
                                        <input type="text" name="reps" className="set-reps input" value="" /><label for="reps">Reps</label>
                                    </p>
                                    <p className="inline remove-container">
                                        
                                    </p>
                                </div>
                            </div>
                        </div>
                        <p>
                            <button type="button" className="adding-sets">Add set</button>
                        </p>
                        <p>
                            <button type="submit">Submit</button>
                        </p>
                    </fieldset>
                </form>

                <div className="routine-container">

                    <ul className="exercise routine exercise-list">
                        <li className="exercise item hidden exercise-item">
                            <h4 className="exercise name exercise-name"></h4>
                            <ul className="exercise sets exercise-sets-list">
                                <li className="exercise set exercise-sets-item hidden">
                                    <span className="sets-data"></span>
                                    <span className="kg-data"></span>
                                    <span className="reps-data"></span>
                                </li>
                            </ul>
                            <p>
                                <button className="remove exercise set remove-exercise-item">close</button>
                            </p>
                        </li>
                    </ul>

                </div>

            </div>

        )
    }
}

export default Create
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './create.css'

class CreateForm extends Component {

    createSetList = []
    
    state = {
        exercise: '',
        sets: [
            { set: 0, reps: 0, weight: 0 }
        ],
        createSetList: this.createSetList
    }

    handleChange = ( e ) => {
        const { name, value } = e.target
    }

    handleSubmit = ( e ) => {
        e.prenvetDefault()
    }

    addSet = () => {
        this.createSetList.push( <this.CreateSet key={0} /> )

        this.setState( { createSetList: this.createSetList } )
    }

    CreateSet = () => {
        return (
            <div className="create set create-set">
                <div className="inline left">
                    <p className="inline set-count">1&nbsp;Set</p>
                </div>
                <div className="inline right">
                    <p className="inline">
                        <input type="text" name="weight" className="set-weight input" value={this.state.weight} onChange={this.handleChange} /><label htmlFor="weight">Kg</label>
                    </p>
                    <p className="inline">
                        <input type="text" name="reps" className="set-reps input" value={this.state.reps} onChange={this.handleChange} /><label htmlFor="reps">Reps</label>
                    </p>
                    <p className="inline remove-container">
                        
                    </p>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="createform-container">

                <form action="#" id="create" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Workout routine</legend>
                        <p>
                            <label htmlFor="exercise">Exercise</label>
                            <input type="text" name="exercise" id="exercise" value={this.state.exercise} onChange={this.handleChange} />
                        </p>

                        <div className="set-container">

                            <this.CreateSet />

                            {this.createSetList}

                        </div>

                        <p><button type="button" className="adding-sets" onClick={this.addSet}>Add set</button></p>
                        <p><button type="submit">Submit</button></p>
                    </fieldset>
                </form>

            </div>
        )
    }
}

class RoutineList extends Component {
    render() {
        return (
            <div className="routine-container">

                <ul className="exercise routine exercise-list">
                    <li className="exercise item hidden exercise-item">
                        <h4 className="exercise name exercise-name"> </h4>
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
        )
    }
}

class Create extends Component {
    render() {
        return (
            <div className="create-container">

                <CreateForm />

                <RoutineList />

            </div>

        )
    }
}

export default Create
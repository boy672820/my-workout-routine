import React, {Component} from 'react'
import './modal.css'

class Modal extends Component {

    handleChange = ( e ) => {
        const { name, value } = e.target

        this.setState( {
            [name]: value
        } )
    }

    submitForm = ( e ) => {
        e.preventDefault()

        this.props.handleSubmit( this.state )
    }

    render() {

        const style = {
            display: this.props.display ? 'block' : 'none'
        }

        return (

            <div className="modal" id="modal" style={style}>

                <div className="modal-box">

                    <form action="#" method="post" id="form-set" onSubmit={this.submitForm}>
                        <fieldset>
                            <p>
                                <label htmlFor="reps">Reps</label>
                                <input type="text" name="reps" id="reps" defaultValue={this.props.formData.reps} onChange={this.handleChange} />
                            </p>
                            <p>
                                <label htmlFor="weight">Weight</label>
                                <input type="text" name="weight" id="weight" defaultValue={this.props.formData.weight} onChange={this.handleChange} />
                            </p>
                            <button type="submit">update</button>
                        </fieldset>
                    </form>
                    <p className="close">
                        <button className="close-modal" onClick={this.props.isModal}>Close</button>
                    </p>

                </div>

            </div>

        )
    }
}

export default Modal
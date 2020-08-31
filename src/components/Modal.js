import React, {Component} from 'react'

class Modal extends Component {

    style = {
        display: 'none'
    }

    closeModal() {
        document.getElementById( 'modal' ).style.display = 'none'
    }

    render() {

        return (

            <div className="modal-container" id="modal" style={this.style}>

                <form action="#" method="post" id="form-set">
                    <input type="hidden" name="exercise" id="exercise" value="" />
                    <input type="hidden" name="set" id="set" value="" />
                    <fieldset>
                        <p>
                            <label for="reps">Reps</label>
                            <input type="text" name="reps" id="reps" value="" />
                        </p>
                        <p>
                            <label for="weight">Weight</label>
                            <input type="text" name="weight" id="weight" value="" />
                        </p>
                        <button type="submit" class="none-submit">update</button>
                    </fieldset>
                </form>
                <p className="close"><button className="close-modal" onClick={this.closeModal}>Close</button></p>

            </div>

        )

    }

}

export default Modal
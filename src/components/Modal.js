import React from 'react'

const Modal = ( { display, isModal, formData } ) => {
    const style = {
        display: display ? 'block' : 'none'
    }

    return (

        <div className="modal-container" id="modal" style={style}>

            <form action="#" method="post" id="form-set">
                <input type="hidden" name="exercise" id="exercise" defaultValue="" />
                <input type="hidden" name="set" id="set" defaultValue="" />
                <fieldset>
                    <p>
                        <label htmlFor="reps">Reps</label>
                        <input type="text" name="reps" id="reps" defaultValue={formData.reps} />
                    </p>
                    <p>
                        <label htmlFor="weight">Weight</label>
                        <input type="text" name="weight" id="weight" defaultValue={formData.weight} />
                    </p>
                    <button type="submit" className="none-submit">update</button>
                </fieldset>
            </form>
            <p className="close"><button className="close-modal" onClick={isModal}>Close</button></p>

        </div>

    )
}

export default Modal
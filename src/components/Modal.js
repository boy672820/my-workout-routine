import React, {Component} from 'react'
import './modal.css'

class Modal extends Component {

    render() {

        const style = {
            display: this.props.display ? 'block' : 'none'
        }

        return (

            <div className="modal" style={style}>

                <div className="modal-box">

                    {this.props.children ? this.props.children : ''}

                </div>

            </div>

        )
    }
}

export default Modal
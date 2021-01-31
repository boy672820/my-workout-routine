import React, { Component } from 'react'
import { Form } from "react-bootstrap"


class RirControl extends Component {

    state = {
        rir: this.props.defaultValue
    }

    handleClick = ( e ) => {
        const calc = Number( e.target.dataset.calc )
        
        let res = this.state.rir + calc

        if ( res <= 0 ) res = 0

        // Control component from parent.
        this.props.handleChild( {
            rir: res
        } );

        // Control component from this.
        this.setState( {
            rir: res
        } )
    }

    handleChange = ( e ) => {
        const value = Number( e.target.value )

        // Check NaN.
        if ( isNaN( value ) ) {
            this.setState( { rir: 0 } )
            return false
        }

        // Control component from parent.
        this.props.handleChild( { rir: value } )

        // Control component from this.
        this.setState( { rir: value } )
    }

    render() {
        return (            
            <Form.Group>
                <Form.Label>RIR(Reps In Reserve)</Form.Label>

                <Form.Control
                    as="select"
                    name="rir"
                    id="rir"
                    title="Please enter your rir."
                    onChange={this.handleChange}
                    value={this.state.rir}
                >
                        {[...Array(10)].map((n, index) => {
                            return (
                                <option key={index}>{index}</option>
                            )
                        })}

                </Form.Control>
            </Form.Group>
        )
    }
    
}

export default RirControl
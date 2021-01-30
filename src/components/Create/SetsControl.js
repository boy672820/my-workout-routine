import React, { Component } from 'react'
import {
    Button,
    Form,
    InputGroup,
} from 'react-bootstrap'


class SetsControl extends Component {

    state = {
        sets: this.props.defaultValue
    }

    handleClick = ( e ) => {
        const calc = Number( e.target.dataset.calc )
        
        let res = this.state.sets + calc

        if ( res <= 0 ) res = 1

        // Control component from parent.
        this.props.handleChild( {
            sets: res
        } );

        // Control component from this.
        this.setState( {
            sets: res
        } )
    }

    handleChange = ( e ) => {
        const value = Number( e.target.value )

        // Check NaN.
        if ( isNaN( value ) ) {
            this.setState( { sets: 1 } )
            return false
        }

        // Check form control in state.
        if ( this.props.validate( 'sets', value ) ) return false

        // Control component from parent.
        this.props.handleChild( { sets: value } )

        // Control component from this.
        this.setState( { sets: value } )
    }

    render() {
        return (
            <Form.Group ref={this.props.controlRef}>
                <Form.Label htmlFor="set">Set</Form.Label>
                
                <InputGroup>
                    <InputGroup.Prepend>
                        <Button variant="outline-secondary" data-calc={-1} onClick={this.handleClick}>-</Button>
                    </InputGroup.Prepend>

                    <Form.Control
                        type="text"
                        id="sets"
                        name="sets"
                        value={this.state.sets}
                        onChange={this.handleChange}
                        title="Please enter at least 1 set." />

                    <InputGroup.Append>
                        <Button variant="outline-secondary" data-calc={1} onClick={this.handleClick}>+</Button>
                    </InputGroup.Append>
                </InputGroup>

                <Form.Text id="valid-sets" className="text-muted" style={ { display: 'none' } }>
                    <span style={ { color: 'red' } }>
                        Please enter at least 1 set.
                    </span>
                </Form.Text>

                <Form.Text className="text-muted">
                    Enter only numbers.
                </Form.Text>
            </Form.Group>
        )
    }
}

export default SetsControl
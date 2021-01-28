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

        // Control component from parent.
        this.props.handleChild( { sets: value } )

        // Control component from this.
        this.setState( { sets: value } )
    }

    render() {
        return (
            <Form.Group>
                <Form.Label>Set</Form.Label>
                
                <InputGroup>
                    <InputGroup.Prepend>
                        <Button variant="outline-secondary" data-calc={-1} onClick={this.handleClick}>-</Button>
                    </InputGroup.Prepend>

                    <Form.Control type="text" id="set" name="set" value={this.state.sets} onChange={this.handleChange} />

                    <InputGroup.Prepend>
                        <Button variant="outline-secondary" data-calc={1} onClick={this.handleClick}>+</Button>
                    </InputGroup.Prepend>
                </InputGroup>

                <Form.Text className="text-muted">
                    숫자만 입력할 수 있습니다.
                </Form.Text>
            </Form.Group>
        )
    }
}

export default SetsControl
import React, { Component } from 'react'
import {
    Button,
    Form,
    InputGroup,
    ButtonGroup,
    DropdownButton,
    Dropdown,
} from 'react-bootstrap'


class WeightControl extends Component {

    state = {
        plate_weight: '2.5',
        weight: this.props.defaultValue
    }

    RadioToggleButton = () => {
        const radios = [
            { name: '2.5kg', value: '2.5' },
            { name: '5kg', value: '5' },
            { name: '10kg', value: '10' },
            { name: '15kg', value: '15' },
            { name: '20kg', value: '20' },
            { name: '25kg', value: '25' }
        ]
    
        return (
            <ButtonGroup>
                <DropdownButton title={'Select plate(' + this.state.plate_weight + 'kg)'} variant="secondary">
                    {
                        radios.map( ( radio, index ) => (
                            <Dropdown.Item
                                key={ index }
                                type="radio"
                                variant="secondary"
                                name="weight-increase-value"
                                size="sm"
                                onSelect={ ( eKey ) => this.setState( { plate_weight: eKey } ) }
                                eventKey={ radio.value }
                            >
                                { radio.name }
                            </Dropdown.Item>
                        ) )
                    }
                </DropdownButton>
            </ButtonGroup>
        )
    }

    handleClick = ( e ) => {
        const calc = e.target.dataset.calc
        
        const calc_weight = Number( this.state.plate_weight ) * calc,
              state_weight = this.state.weight

        let res = state_weight + calc_weight

        if ( res <= 0 ) res = 0
              
        // Control component from parent.
        this.props.handleChild( { weight: res } )

        // Control component from this.
        this.setState( {
            weight: res
        } )
    }

    handleChange = ( e ) => {
        const value = Number( e.target.value )

        // Check NaN.
        if ( isNaN( value ) ) {
            this.setState( { weight: 0 } )
            return false
        }

        // Check form control in state.
        if ( ! this.props.validate( 'weight', value ) ) return false

        // Control component from parent.
        this.props.handleChild( { weight: value } )

        // Control component from this.
        this.setState( { weight: value } )
    }

    render() {
        return (
            <Form.Group ref={this.props.controlRef}>
                <Form.Label htmlFor="weight">Weight(kg)</Form.Label>

                <Form.Group>
                    <this.RadioToggleButton />
                </Form.Group>

                <InputGroup>
                    <InputGroup.Prepend>
                        <Button variant="outline-secondary" onClick={this.handleClick} data-calc={-1}>-</Button>
                    </InputGroup.Prepend>

                    <Form.Control
                        type="text"
                        id="weight"
                        name="weight"
                        value={this.state.weight}
                        onChange={this.handleChange}
                        title="Please enter at least 1 weight." />

                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={this.handleClick} data-calc={1}>+</Button>
                    </InputGroup.Append>
                </InputGroup>

                <Form.Text id="valid-weight" className="text-muted" style={ { display: 'none' } }>
                    <span style={ { color: 'red' } }>
                        Please enter at least 1 weight.
                    </span>
                </Form.Text>

                <Form.Text className="text-muted">
                    Enter only numbers.
                </Form.Text>
            </Form.Group>

        )
    }
}

export default WeightControl
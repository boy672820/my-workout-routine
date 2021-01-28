import React, { Component } from 'react'
import {
    Button,
    Form,
    InputGroup,
    ButtonGroup,
    ToggleButton,
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
            <ButtonGroup toggle>
                {
                    radios.map( ( radio, index ) => (
                        <ToggleButton
                            key={ index }
                            type="radio"
                            variant="secondary"
                            name="weight-increase-value"
                            value={ radio.value }
                            checked={ this.state.plate_weight === radio.value }
                            onChange={ ( e ) => this.setState( { plate_weight: e.target.value } ) }
                        >
                            { radio.name }
                        </ToggleButton>
                    ) )
                }
            </ButtonGroup>
        )
    }

    handleClick = ( e ) => {
        const calc = e.target.dataset.calc
        
        const calc_weight = Number( this.state.plate_weight ) * calc,
              state_weight = this.state.weight

        const res = state_weight + calc_weight
              
        // Control component from parent.
        this.props.handleChild( { weight: res } )

        // Control component from this.
        this.setState( {
            weight: res
        } )
    }

    handleChange = ( e ) => {
        const value = Number( e.target.value )

        // Control component from parent.
        this.props.handleChild( { weight: value } )

        // Control component from this.
        this.setState( { weight: value } )
    }

    render() {
        return (
            <Form.Group>
                <Form.Label>Weight(kg)</Form.Label>

                <Form.Group>
                    <this.RadioToggleButton />
                </Form.Group>

                <InputGroup>
                    <InputGroup.Prepend>
                        <Button variant="outline-secondary" onClick={this.handleClick} data-calc={-1}>-</Button>
                    </InputGroup.Prepend>

                    <Form.Control type="text" id="weight" name="weight" value={this.state.weight} onChange={this.handleChange} />

                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={this.handleClick} data-calc={1}>+</Button>
                    </InputGroup.Append>
                </InputGroup>

                <Form.Text className="text-muted">
                    숫자만 입력할 수 있습니다.
                </Form.Text>
            </Form.Group>

        )
    }
}

export default WeightControl
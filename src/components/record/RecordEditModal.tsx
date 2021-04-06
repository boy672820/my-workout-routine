import React from 'react'

import {
    Button,
    Modal,
    Form,
    Col,
    ButtonGroup,
    ToggleButton,
    InputGroup
} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"


interface PropsInterface {
    modal: boolean
    setModal: any
    data: any
    updateEditData: ( update: any ) => void
    updateExerciseData: ( update: any ) => void
}
interface StateInterface {
    weight_plate: number
}


class RecordEditModal extends React.Component<PropsInterface, StateInterface> {

    constructor( props: PropsInterface ) {
        super( props )

        this.state = {
            weight_plate: 20,
        }

        this.handleChange = this.handleChange.bind( this )
        this.handlePlateToggle = this.handlePlateToggle.bind( this )
        this.handleIncrease = this.handleIncrease.bind( this )
        this.validate = this.validate.bind( this )
        this.handleSubmit = this.handleSubmit.bind( this )
    }


    /**
     * Validate form.
     * @param target 
     * @returns 
     */
    async validate( target: any ) {
        const { name, value } = target
        const update: any = {};

        const negativeValid = ( value: number ) => {
            return value < 0 ? 0 : value
        }

        switch( name ) {
            case "set_disable_range":
                update[ name ] = ! target.checked

                break

            case "set_reps":
                if ( value >= this.props.data.set_max_reps ) update[ "set_max_reps" ] = Number( value ) + 1

                update[ name ] = negativeValid( Number( value ) )

                break

            case "set_max_reps":
                const max_value = Number( value ) <= 2 ? 2 : Number( value )
                
                if ( max_value <= this.props.data.set_reps ) update[ "set_reps" ] = max_value - 1

                update[ name ] = max_value

                break
            
            default:
                const default_value = Number( value )

                if ( ! isNaN( default_value ) )
                    update[ name ] = negativeValid( default_value )

                break
        }

        return update
    }

    /**
     * Handle change event.
     * @param e 
     */
    async handleChange( e: React.ChangeEvent<HTMLInputElement> ) {
        const update = await this.validate( e.target )

        this.props.updateEditData( update )
    }

   /**
    * Handle increment form.
    * @param target 
    * @param increment 
    */ 
    async handleIncrease( target: string, increment: number ) {
        const { updateEditData, data } = this.props

        const value = data[ target ] + increment

        const valid_update = await this.validate( { name: target, value: value } )

        updateEditData( valid_update )
    }

    /**
     * Toggle weight plate.
     * @param e 
     */
    async handlePlateToggle( e: React.ChangeEvent<HTMLInputElement> ) {
        const { value } = e.target

        this.setState( {
            weight_plate: Number( value )
        } )
    }

    /**
     * Handle submit form component.
     */
    async handleSubmit() {
        const { updateExerciseData, data } = this.props

        const { ID, exercise_id, set_number, set_weight, set_reps, set_max_reps, set_disable_range, set_rir } = data
        const update = {
            ID: ID,
            exercise_id: exercise_id,
            set_number: set_number,
            set_weight: set_weight,
            set_reps: set_reps,
            set_max_reps: set_max_reps,
            set_disable_range: set_disable_range,
            set_rir: set_rir,
            set_rest: ( data.set_rest_minute * 60 ) + data.set_rest_second
        }

        updateExerciseData( update )
    }


    render() {
        const { modal, setModal, data } = this.props

        return (
            <Modal show={ modal } onHide={ setModal } animation={ true } centered>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>정지 벤치프레스 1세트 수정</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        {/* Weight */}
                        <Form.Group>
                            <Form.Label htmlFor="set_weight">중량</Form.Label>

                            <Form.Group className="weight-group">
                                <ButtonGroup toggle aria-label="증가할 중량" className="weight-plate-group">
                                    {
                                        [
                                            { name: '2.5kg', value: 2.5, variant: 'light' },
                                            { name: '5kg', value: 5, variant: 'light' },
                                            { name: '10kg', value: 10, variant: 'success' },
                                            { name: '15kg', value: 15, variant: 'warning' },
                                            { name: '20kg', value: 20, variant: 'primary' },
                                            { name: '25kg', value: 25, variant: 'danger' }
                                        ]
                                        .map( ( item, idx ) => {
                                            return (
                                                <ToggleButton key={ idx }
                                                    type="radio"
                                                    size="sm"
                                                    variant={ item.variant }
                                                    checked={ this.state.weight_plate === item.value }
                                                    onChange={ this.handlePlateToggle }
                                                    value={ item.value }
                                                >
                                                    {item.name}
                                                </ToggleButton>
                                            )
                                        } )
                                    }
                                </ButtonGroup>
                            </Form.Group>

                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Button type="button" variant="outline-secondary" title="감소" onClick={ () => { this.handleIncrease( "set_weight", -1 * this.state.weight_plate ) } }>
                                        <FontAwesomeIcon icon={ faAngleDown } />
                                    </Button>
                                </InputGroup.Prepend>

                                <Form.Control
                                    type="text"
                                    id="set_weight"
                                    name="set_weight"
                                    placeholder="중량을 입력해주세요."
                                    onChange={ this.handleChange }
                                    value={ data.set_weight }
                                />

                                <InputGroup.Append>
                                    <Button type="button" variant="outline-secondary" title="증가" onClick={ () => { this.handleIncrease( "set_weight", this.state.weight_plate ) } }>
                                        <FontAwesomeIcon icon={ faAngleUp } />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        {/* Reps */}
                        <Form.Row>
                            <Col xs={ 6 }>
                                <Form.Group>
                                    <Form.Label htmlFor="set_reps">횟수</Form.Label>

                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <Button type="button" variant="outline-secondary" title="감소" onClick={ () => { this.handleIncrease( "set_reps", -1 ) } }>
                                                <FontAwesomeIcon icon={ faAngleDown } />
                                            </Button>
                                        </InputGroup.Prepend>

                                        <Form.Control
                                            type="text"
                                            id="set_reps"
                                            name="set_reps"
                                            placeholder="횟수를 입력해주세요."
                                            onChange={ this.handleChange }
                                            value={ data.set_reps }
                                        />

                                        <InputGroup.Append>
                                            <Button type="button" variant="outline-secondary" title="증가" onClick={ () => { this.handleIncrease( "set_reps", 1 ) } }>
                                                <FontAwesomeIcon icon={ faAngleUp } />
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                            <Col xs={ 6 }>
                                <Form.Group>
                                    <Form.Label htmlFor="set_max_reps">최대 횟수</Form.Label>

                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <Button type="button" variant="outline-secondary" title="감소" onClick={ () => { this.handleIncrease( "set_max_reps", -1 ) } } disabled={ data.set_disable_range }>
                                                <FontAwesomeIcon icon={ faAngleDown } />                                                    
                                            </Button>
                                        </InputGroup.Prepend>

                                        <Form.Control
                                            type="text"
                                            id="set_max_reps"
                                            name="set_max_reps"
                                            placeholder="횟수를 입력해주세요."
                                            onChange={ this.handleChange }
                                            value={ data.set_max_reps }
                                            disabled={ data.set_disable_range }
                                        />

                                        <InputGroup.Append>
                                            <Button type="button" variant="outline-secondary" title="증가" onClick={ () => { this.handleIncrease( "set_max_reps", 1 ) } } disabled={ data.set_disable_range }>
                                                <FontAwesomeIcon icon={ faAngleUp } />                                                    
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>

                                    <Form.Check
                                        type="checkbox"
                                        name="set_disable_range"
                                        id="set_disable_range"
                                        className="label-checkbox"
                                        onChange={ this.handleChange }
                                        checked={ ! data.set_disable_range ? true : false }
                                    />
                                    <label htmlFor="set_disable_range" className="label-text">최대 횟수 사용</label>
                                </Form.Group>
                            </Col>
                        </Form.Row>

                        <Form.Group>
                            <Form.Label htmlFor="set_rir">RIR</Form.Label>
                            <Form.Control
                                as="select"
                                name="set_rir"
                                id="set_rir"
                                onChange={ this.handleChange }
                                value={ data.set_rir }
                            >
                                {
                                    [ ...Array( 11 ) ].map( ( v, i ) => {
                                        return <option value={ i } key={ i }>{ i }</option>
                                    } )
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label htmlFor="set_rest">쉬는시간</Form.Label>

                            <Form.Row>
                                <Col xs={ 4 }>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <Button
                                                variant="outline-secondary"
                                                title="감소"
                                                onClick={ () => { this.handleIncrease( "set_rest_minute", -1 ) } }
                                            >
                                                <FontAwesomeIcon icon={ faAngleDown } />
                                            </Button>
                                        </InputGroup.Prepend>

                                        <Form.Control
                                            type="text"
                                            name="set_rest_minute"
                                            id="set_rest_minute"
                                            onChange={ this.handleChange }
                                            value={ data.set_rest_minute }
                                        />

                                        <InputGroup.Append>
                                            <Button
                                                variant="outline-secondary"
                                                title="증가"
                                                onClick={ () => { this.handleIncrease( "set_rest_minute", 1 ) } }
                                            >
                                                <FontAwesomeIcon icon={ faAngleUp } />
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>

                                <Form.Label htmlFor="rest_minute" column xs={ 1 }>분</Form.Label>

                                <Col xs={ 4 }>
                                    <Form.Control
                                        as="select"
                                        name="set_rest_second"
                                        id="set_rest_second"
                                        onChange={ this.handleChange }
                                        value={ data.set_rest_second }
                                    >
                                        {
                                            [ ...Array( 60 ) ].map( ( v, i ) => {
                                                return <option value={ i } key={ i }>{ i }</option>
                                            } )
                                        }
                                    </Form.Control>
                                </Col>

                                <Form.Label htmlFor="rest_second" column xs={ 1 }>초</Form.Label>
                            </Form.Row>

                        </Form.Group>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={ () => { setModal( false ) } }>닫기</Button>
                        <Button
                            variant="primary"
                            onClick={
                                () => {
                                    setModal( false )
                                    this.handleSubmit()
                                }
                            }
                        >저장</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default RecordEditModal
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
    updateData: ( update: any ) => void
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
    }


    async handleChange( e: React.ChangeEvent<HTMLInputElement> ) {
        const { name, value } = e.target

        this.props.updateData( {
            [ name ]: Number( value )
        } )
    }

    async handlePlateToggle( e: React.ChangeEvent<HTMLInputElement> ) {
        const { value } = e.target

        this.setState( {
            weight_plate: Number( value )
        } )
    }

    async handleIncrease( target: string, increment: number ) {
        const { updateData, data } = this.props
        const value = data[ target ] + increment

        updateData( {
            [ target ]: value
        } )
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
                                    defaultValue={ data.set_weight }
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
                                            defaultValue={ data.set_reps }
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
                                            <Button type="button" variant="outline-secondary" title="감소" onClick={ () => { this.handleIncrease( "set_max_reps", -1 ) } }>
                                                <FontAwesomeIcon icon={ faAngleDown } />                                                    
                                            </Button>
                                        </InputGroup.Prepend>

                                        <Form.Control
                                            type="text"
                                            id="set_max_reps"
                                            name="set_max_reps"
                                            placeholder="횟수를 입력해주세요."
                                            onChange={ this.handleChange }
                                            defaultValue={ data.set_max_reps }
                                        />

                                        <InputGroup.Append>
                                            <Button type="button" variant="outline-secondary" title="증가" onClick={ () => { this.handleIncrease( "set_max_reps", 1 ) } }>
                                                <FontAwesomeIcon icon={ faAngleUp } />                                                    
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>

                                    <Form.Check
                                        type="checkbox"
                                        name="disable_range"
                                        id="disable_range"
                                        className="label-checkbox"
                                        onChange={ this.handleChange }
                                        checked={ data.set_disable_range ? true : false }
                                    />
                                    <label htmlFor="disable_range" className="label-text">최대 횟수 사용</label>
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
                                defaultValue={ data.set_rir }
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
                                            defaultValue={ data.set_rest_minute }
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
                                        defaultValue={ data.set_rest_second }
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
                        <Button variant="primary" onClick={ () => { setModal( false ) } }>저장</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default RecordEditModal
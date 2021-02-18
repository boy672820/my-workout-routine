import React, { Component } from 'react'
import {
    Container,
    Form,
    InputGroup,
    Col,
    Card,
    Button,
    ToggleButton,
    ButtonGroup,
    OverlayTrigger,
    Popover
} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp, faQuestionCircle } from "@fortawesome/free-solid-svg-icons"

import { CreatePropsInterface, CreateStateInterface } from './create.interface'
import './create.css'


class Create extends Component<CreatePropsInterface, CreateStateInterface> {

    constructor( props: CreatePropsInterface ) {
        super( props )

        this.state = {
            exercise_name: '',
            set_number: 3,
            weight: 20,
            reps: 8,
            max_reps: 10,
            disable_range: true,
            rir: 0,
            weight_plate: 20
        }

        /** Bind events */
        this.handleRange = this.handleRange.bind( this )
        this.handlePlateToggle = this.handlePlateToggle.bind( this )
        this.handleForm = this.handleForm.bind( this )
        this.handleIncrement = this.handleIncrement.bind( this )
    }

    async handleRange( e: React.ChangeEvent<HTMLInputElement> ) {
        const { checked } = e.target

        this.setState( {
            disable_range: !checked
        } )
    }

    async handlePlateToggle( e: React.ChangeEvent<HTMLInputElement> ) {
        const { value } = e.target

        this.setState( {
            weight_plate: Number( value )
        } )
    }

    async handleForm( e: React.ChangeEvent<HTMLInputElement> ) {
        const { name, value } = e.target

        const update: CreateStateInterface = { ...this.state }

        switch( name ) {
            case 'exercise_name':
                update[ 'exercise_name' ] = value
                break

            case 'set_number':
            case 'weight':
            case 'reps':
            case 'max_reps':
            case 'rir':
                update[ name ] = Number( value )
                break
        }

        this.setState( update )
    }

    async handleIncrement( target_name: string, value: number ) {
        const increment = this.state[ target_name ] + value

        if ( increment > 0 ) this.setState( { [ target_name ]: increment } )
    }

    render() {
        return (
            <main className="main">

                <Container>

                    <header className="create-header">
                        <h5>운동 일정 작성</h5>
                    </header>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label htmlFor="exercise_name">종목</Form.Label>
                                    <Form.Control type="text" name="exercise_name" id="exercise_name" placeholder="종목을 입력해주세요." onChange={ this.handleForm } value={ this.state.exercise_name } />
                                </Form.Group>

                                <Form.Row>
                                    <Col xs={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor="set_number">세트</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <Button variant="outline-secondary" title="감소" onClick={ () => this.handleIncrement( 'set_number', -1 ) }><FontAwesomeIcon icon={ faAngleDown } /></Button>
                                                </InputGroup.Prepend>
                                                <Form.Control type="text" name="set_number" id="set_number" placeholder="세트" onChange={ this.handleForm } value={ this.state.set_number } />
                                                <InputGroup.Append>
                                                    <Button variant="outline-secondary" title="증가" onClick={ () => this.handleIncrement( 'set_number', 1 ) }><FontAwesomeIcon icon={ faAngleUp } /></Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="no margin">
                                            <Form.Label htmlFor="reps">횟수</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <Button variant="outline-secondary" title="감소" onClick={ () => this.handleIncrement( 'reps', -1 ) }><FontAwesomeIcon icon={ faAngleDown } /></Button>
                                                </InputGroup.Prepend>
                                                <Form.Control type="text" name="reps" id="reps" placeholder="횟수" onChange={ this.handleForm } value={ this.state.reps } />
                                                <InputGroup.Append>
                                                    <Button variant="outline-secondary" title="증가" onClick={ () => this.handleIncrement( 'reps', 1 ) }><FontAwesomeIcon icon={ faAngleUp } /></Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="disable-group no margin">
                                            <Form.Check type="checkbox" name="disable_range" id="disable_range" className="label-checkbox" onChange={ this.handleRange } />
                                            <label htmlFor="disable_range" className="label-text">최대 횟수 사용</label>
                                        </Form.Group>

                                        <Form.Group>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <Button variant="outline-secondary" title="감소" onClick={ () => this.handleIncrement( 'max_reps', -1 ) }><FontAwesomeIcon icon={ faAngleDown } /></Button>
                                                </InputGroup.Prepend>
                                                <Form.Control type="text" name="max_reps" id="max_reps" placeholder="최대 횟수" disabled={this.state.disable_range} onChange={ this.handleForm } value={ this.state.max_reps } />
                                                <InputGroup.Append>
                                                    <Button variant="outline-secondary" title="증가" onClick={ () => this.handleIncrement( 'max_reps', 1 ) }><FontAwesomeIcon icon={ faAngleUp } /></Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>

                                <Form.Group>
                                    <Form.Label htmlFor="weight">중량</Form.Label>

                                    <Form.Group className="weight-group">
                                        <ButtonGroup toggle aria-label="증가할 중량">
                                            {
                                                [
                                                    { name: '2.5kg', value: 2.5 },
                                                    { name: '5kg', value: 5 },
                                                    { name: '10kg', value: 10 },
                                                    { name: '15kg', value: 15 },
                                                    { name: '20kg', value: 20 },
                                                    { name: '25kg', value: 25 }
                                                ]
                                                .map( ( item, idx ) => {
                                                    return (
                                                        <ToggleButton key={idx}
                                                            type="radio"
                                                            value={item.value}
                                                            checked={ this.state.weight_plate === item.value }
                                                            variant="secondary"
                                                            size="sm"
                                                            onChange={ this.handlePlateToggle }
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
                                            <Button variant="outline-secondary" title="감소"><FontAwesomeIcon icon={faAngleDown} /></Button>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text" name="weight" id="weight" placeholder="중량을 입력해주세요." onChange={ this.handleForm } value={ this.state.weight } />
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" title="증가"><FontAwesomeIcon icon={faAngleUp} /></Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="rir">
                                        RIR(Repetitions In Reserve)&nbsp;
                                        <OverlayTrigger trigger="click" placement="top" overlay={
                                            <Popover id="popover-basic">
                                                <Popover.Title as="h3">*RIR(Repetitions In Reserve)</Popover.Title>
                                                <Popover.Content>
                                                    절대 피로에 도달하기 전에 남은 횟수를 추정하여 운동 강도를 측정하는 지표 입니다.<br />
                                                    예를 들어, 벤치프레스를 100kg으로 최대 8회까지 가능한 사람이 6회를 진행한다면 해당 훈련은 2RIR로 진행하게 됩니다.<br />
                                                    반대로 이 사람이 100kg을 8회로 운동을 수행하면 0RIR이 됩니다.
                                                </Popover.Content>
                                            </Popover>
                                        }>
                                            <button className="btn-init" type="button">
                                                <FontAwesomeIcon icon={ faQuestionCircle } className="vertical align middle" />
                                            </button>
                                        </OverlayTrigger>
                                        
                                    </Form.Label>
                                    <Form.Control as="select" name="rir" id="rir" onChange={ this.handleForm } value={ this.state.rir }>
                                        <option value={0}>0</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                    </Form.Control>
                                </Form.Group>

                                <Button variant="primary" type="submit" size="lg" className="create-submit-btn">저장</Button>
                            </Form>
                        </Card.Body>
                    </Card>

                </Container>


            </main>
        )    
    }
}

export default Create
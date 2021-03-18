import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faAngleDown,
    faAngleUp
} from "@fortawesome/free-solid-svg-icons"
import {
    InputGroup,
    Form,
    Button,
    Col,
    ButtonGroup,
    ToggleButton
} from 'react-bootstrap'


interface CreateEditSetPropsInterface {
    parent: any
    prefix: string
}

interface CreateEditSetStateInterface {}


class CreateEditSet extends Component<CreateEditSetPropsInterface, CreateEditSetStateInterface> {

    constructor( props: CreateEditSetPropsInterface ) {
        super( props )

        this.state = {}
    }

    render() {
        const { parent, prefix } = this.props

        return (
            <>
                <Form.Row>
                    <Col xs={ 6 }>
                        <Form.Group>
                            <Form.Label htmlFor={ `${prefix}set_reps` }>횟수</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Button
                                        variant="outline-secondary"
                                        title="감소"
                                        onClick={ () => parent.handleIncrement( `${prefix}set_reps`, -1, prefix ) }
                                    >
                                        <FontAwesomeIcon icon={ faAngleDown } />
                                    </Button>
                                </InputGroup.Prepend>

                                <Form.Control type="text"
                                    id={ `${prefix}set_reps` }
                                    name={ `${prefix}set_reps` }
                                    onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => parent.handleForm( e, prefix ) }
                                    value={ parent.state[ `${prefix}set_reps` ] }
                                />

                                <InputGroup.Append>
                                    <Button
                                        variant="outline-secondary"
                                        title="증가"
                                        onClick={ () => parent.handleIncrement( `${prefix}set_reps`, 1, prefix ) }
                                    >
                                        <FontAwesomeIcon icon={ faAngleUp } />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Col>

                    <Col xs={ 6 }>
                        <Form.Group>
                            <Form.Label htmlFor={ `${prefix}edit_set_max_reps` }>최대 횟수</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Button
                                        variant="outline-secondary"
                                        title="감소"
                                        disabled={ parent.state[ `${prefix}set_disable_range` ] }
                                        onClick={ () => parent.handleIncrement( `${prefix}set_max_reps`, -1, prefix ) }
                                    >
                                        <FontAwesomeIcon icon={ faAngleDown } />
                                    </Button>
                                </InputGroup.Prepend>

                                <Form.Control
                                    type="text"
                                    id={ `${prefix}set_max_reps` }
                                    name={ `${prefix}set_max_reps` }
                                    disabled={ parent.state[ `${prefix}set_disable_range` ] }
                                    onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => parent.handleForm( e, prefix ) }
                                    value={ parent.state[ `${prefix}set_max_reps` ] }
                                />

                                <InputGroup.Append>
                                    <Button
                                        variant="outline-secondary"
                                        title="증가"
                                        disabled={ parent.state[ `${prefix}set_disable_range` ] }
                                        onClick={ () => parent.handleIncrement( `${prefix}set_max_reps`, 1, prefix ) }
                                    >
                                        <FontAwesomeIcon icon={ faAngleUp } />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>

                            <Form.Check
                                type="checkbox"
                                name={ `${prefix}set_disable_range` }
                                id={ `${prefix}set_disable_range` }
                                className="label-checkbox"
                                onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => parent.handleRange( e, prefix ) }
                                checked={ ! parent.state[ `${prefix}set_disable_range` ] }
                            />
                            <label htmlFor={ `${prefix}set_disable_range` } className="label-text">최대 횟수 사용</label>
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Group>
                    <Form.Label htmlFor={ `${prefix}set_weight` }>중량</Form.Label>
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
                                            checked={ parent.state.weight_plate === item.value }
                                            onChange={ parent.handlePlateToggle }
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
                            <Button
                                variant="outline-secondary"
                                title="감소"
                                onClick={ () => parent.handleIncreaseWeight( -1, prefix ) }
                            >
                                <FontAwesomeIcon icon={faAngleDown} />
                            </Button>
                        </InputGroup.Prepend>

                        <Form.Control
                            type="text"
                            name={ `${prefix}set_weight` }
                            id={ `${prefix}set_weight` }
                            placeholder="중량을 입력해주세요."
                            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => parent.handleForm( e, prefix ) }
                            value={ parent.state[ `${prefix}set_weight` ] }
                        />

                        <InputGroup.Append>
                            <Button
                                variant="outline-secondary"
                                title="증가"
                                onClick={ () => parent.handleIncreaseWeight( 1, prefix ) }
                            >
                                <FontAwesomeIcon icon={faAngleUp} />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor={ `${prefix}set_rir` }>RIR</Form.Label>
                    <Form.Control
                        as="select"
                        name={ `${prefix}set_rir` }
                        id={ `${prefix}set_rir` }
                        onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => parent.handleForm( e, prefix ) }
                        value={ parent.state[ `${prefix}set_rir` ] }
                    >
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

                <Form.Group>
                    <Form.Label htmlFor={ `${prefix}set_rest_minute` }>휴식 시간</Form.Label>

                    <Form.Row>
                        <Col xs={ 4 }>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Button
                                        variant="outline-secondary"
                                        title="감소"
                                        onClick={ () => parent.handleIncrement( `${prefix}set_rest_minute`, -1, prefix ) }
                                    >
                                        <FontAwesomeIcon icon={ faAngleDown } />
                                    </Button>
                                </InputGroup.Prepend>

                                <Form.Control
                                    type="text"
                                    name={ `${prefix}set_rest_minute` }
                                    id={ `${prefix}set_rest_minute` }
                                    onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => parent.handleRange( e, prefix ) }
                                    value={ parent.state[ `${prefix}set_rest_minute` ] }
                                />

                                <InputGroup.Append>
                                    <Button
                                        variant="outline-secondary"
                                        title="증가"
                                        onClick={ () => parent.handleIncrement( `${prefix}set_rest_minute`, 1, prefix ) }
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
                                name={ `${prefix}set_rest_second` }
                                id={ `${prefix}set_rest_second` }
                                onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => parent.handleForm( e, prefix ) }
                                value={ parent.state[ `${prefix}set_rest_second` ] }
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
            </>
        )
    }
}

export default CreateEditSet
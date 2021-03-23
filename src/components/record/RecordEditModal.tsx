import React, { useState } from 'react'

import {
    Button,
    Modal,
    Form,
    Col,
    InputGroup
} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"


interface propsInterface {
    modal: boolean
    setModal: any
    data: any
}


export default function RecordEditModal( { modal, setModal, data }: propsInterface ) {

    console.log(data)

    const [ weight, setWeight ] = useState<number>( data.set_weight )
    const [ reps, setReps ] = useState<number>( data.set_reps )
    const [ maxReps, setMaxReps ] = useState<number>( data.set_max_reps )
    const [ disableRange, setDisableRange ] = useState<number>( data.set_disable_range )
    const [ rir, setRir ] = useState<number>( data.set_rir )

    const [ rest, setRest ] = useState<number>( data.set_rest )

    const rest_minute = Math.floor( data.set_rest / 60 )
    const rest_second = data.rest - ( rest_minute / 60 )

    const [ restMinute, setRestMinute ] = useState<number>( rest_minute )
    const [ restSecond, setRestSecond ] = useState<number>( rest_second )

    const handleChange = ( e: React.ChangeEvent ) => {

    };


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

                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-secondary" title="감소">
                                            <FontAwesomeIcon icon={ faAngleDown } />
                                        </Button>
                                    </InputGroup.Prepend>

                                    <Form.Control
                                        type="text"
                                        id="set_weight"
                                        name="set_weight"
                                        placeholder="중량을 입력해주세요."
                                        onChange={ ( e ) => { handleChange( e ) } }
                                        value={ weight }
                                    />

                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-secondary" title="증가">
                                            <FontAwesomeIcon icon={ faAngleUp } />
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>

                            {/* Reps */}
                            <Form.Row>
                                <Col xs={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="set_reps">횟수</Form.Label>

                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <Button type="button" variant="outline-secondary" title="감소">
                                                    <FontAwesomeIcon icon={ faAngleDown } />
                                                </Button>
                                            </InputGroup.Prepend>

                                            <Form.Control
                                                type="text"
                                                id="set_reps"
                                                name="set_reps"
                                                placeholder="횟수를 입력해주세요."
                                                onChange={ ( e ) => { handleChange( e ) } }
                                                value={ reps }
                                            />

                                            <InputGroup.Append>
                                                <Button type="button" variant="outline-secondary" title="증가">
                                                    <FontAwesomeIcon icon={ faAngleUp } />
                                                </Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>

                                <Col xs={6}>
                                    <Form.Group>
                                        <Form.Label htmlFor="set_max_reps">최대 횟수</Form.Label>

                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <Button type="button" variant="outline-secondary" title="감소">
                                                    <FontAwesomeIcon icon={ faAngleDown } />                                                    
                                                </Button>
                                            </InputGroup.Prepend>

                                            <Form.Control
                                                type="text"
                                                id="set_max_reps"
                                                name="set_max_reps"
                                                placeholder="횟수를 입력해주세요."
                                                onChange={ ( e ) => { handleChange( e ) } }
                                                value={ maxReps }
                                            />

                                            <InputGroup.Append>
                                                <Button type="button" variant="outline-secondary" title="증가">
                                                    <FontAwesomeIcon icon={ faAngleUp } />                                                    
                                                </Button>
                                            </InputGroup.Append>
                                        </InputGroup>

                                        <Form.Check
                                            type="checkbox"
                                            name="disable_range"
                                            id="disable_range"
                                            className="label-checkbox"
                                            onChange={ ( e ) => { handleChange( e ) } }
                                            checked={ disableRange ? true : false }
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
                                    onChange={ ( e ) => { handleChange( e ) } }
                                    value={ rir }
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
                                                >
                                                    <FontAwesomeIcon icon={ faAngleDown } />
                                                </Button>
                                            </InputGroup.Prepend>

                                            <Form.Control
                                                type="text"
                                                name="set_rest_minute"
                                                id="set_rest_minute"
                                                onChange={ ( e ) => { handleChange( e ) } }
                                                value={ restMinute }
                                            />

                                            <InputGroup.Append>
                                                <Button
                                                    variant="outline-secondary"
                                                    title="증가"
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
                                            onChange={ ( e ) => { handleChange( e ) } }
                                            value={ restSecond }
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
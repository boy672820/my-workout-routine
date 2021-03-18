import React, { useEffect, useState } from 'react'
import {
    Container,
    Table,
    Button,
    Modal,
    Form,
    Card,
    Col,
    InputGroup
} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBurn, faEdit, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"

import './record.css'
import { RoutineAPI } from '../../api/routine/routine.api'
import { useParams } from 'react-router-dom'


function Records() {
    const { block_id }: any = useParams()

    const [ modal, setModal ] = useState( false )
    const [ title, setTitle ] = useState( '' )
    const [ routineDate, setRoutineDate ] = useState( '...' )

    const [ data, setData ] = useState<any[]>( [] )
    const [ complete, setComplete ] = useState<number[]>( [] )

    const [ setId, setSetId ] = useState( 0 )
    const [ setNumber, setSetNumber ] = useState( 0 )
    const [ weight, setWeight ] = useState( 0 )
    const [ reps, setReps ] = useState( 0 )
    const [ maxReps, setMaxReps ] = useState( 0 )
    const [ rir, setRir ] = useState( 0 )
    const [ restMinute, setRestMinute ] = useState( 0 )
    const [ restSecond, setRestSecond ] = useState( 0 )


    useEffect( () => {
        // Get block title.
        RoutineAPI.getBlock( block_id ).then( response => {
            const { block_title } = response.data

            setTitle( block_title )
        } )
        // Get exercises.
        RoutineAPI.getExercises( block_id ).then( response => {
            setData( response.data )
        } )
        // Get routine date.
        RoutineAPI.getRoutineDate( block_id ).then( response => {
            setRoutineDate( response.data.routine_date )
        } )
    }, [ block_id ] )


    const handleModal = () => {
        setModal( ! modal )
    }

    const handleEdit = ( data: any ) => {
        handleModal()

        const { ID, set_number, set_weight, set_reps, set_max_reps, set_rir, set_rest } = data

        const rest_minute = Math.floor( set_rest / 60 )
        const rest_second = set_rest - ( rest_minute * 60 )

        setSetId( ID )
        setSetNumber( set_number )
        setWeight( set_weight )
        setReps( set_reps )
        setMaxReps( set_max_reps )
        setRir( set_rir )
        setRestMinute( rest_minute )
        setRestSecond( rest_second )
    }

    const handleComplete = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const { value, checked } = e.target

        if ( checked ) setComplete( [ ...complete, Number( value ) ] )

        else {
            const index = complete.indexOf( Number( value ) )

            complete.splice( index, 1 )

            setComplete( [ ...complete ] )
        }
    }


    return (
        <>
            <div className="record-date">
                <Container>
                    <h2 className="record-date-title">
                        <strong>(토요일)</strong> <span>{ title }</span>
                    </h2>
                    <p className="record-date-desc">
                        { ( ( date ) => {
                            const split = date.split( '/' )

                            return `${split[ 0 ]}년 ${split[ 1 ]}월 ${split[ 2 ]}일`
                        } )( routineDate ) }
                    </p>
                </Container>
            </div>

            <main className="main record-main">
                <Container>
                    { data.map( ( item, index ) => {
                        return (
                            <Card className="record-item" key={ index }>
                                <Card.Header>
                                    <div className="record-item-header">
                                        <h4>
                                            <FontAwesomeIcon icon={faBurn} style={{color: '#dc3545'}} />&nbsp;&nbsp;
                                            { item.exercise_name }
                                        </h4>
                                    </div>
                                </Card.Header>
                                <Card.Body className="no padding">
                                    <Table className="record-item-table no margin text align center">
                                        <tbody>
                                            { item.sets.map( ( set: any, set_index: number ) => {
                                                const completeClass = complete.indexOf( set.ID ) < 0 ? '' : 'record-item-complete-set'

                                                return (
                                                    <tr key={ set_index } className={ completeClass }>
                                                        <td className="vertical align middle">
                                                            <div className="vertical align middle display inline block">
                                                                <Form.Check type="checkbox" name="complete" id={ `complete-${set.ID}` } onChange={ handleComplete } value={ set.ID } />
                                                            </div>&nbsp;
                                                            <div className="record-item-set-title vertical align middle display inline block">
                                                                <Form.Label htmlFor={ `complete-${set.ID}` } className="no margin">
                                                                    { set.set_number }세트
                                                                </Form.Label>
                                                            </div>
                                                        </td>
                                                        <td className="vertical align middle">{ set.set_weight }kg</td>
                                                        <td className="vertical align middle">{ set.set_reps }{ set.set_disable_range ? '' : `~${set.set_max_reps}` }회</td>
                                                        <td className="vertical align middle">{ set.set_rir }RIR</td>
                                                        <td className="vertical align middle">
                                                            <Button variant="link" title="수정하기" onClick={ () => { handleEdit( set ) } }>
                                                                <FontAwesomeIcon icon={faEdit} />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            } ) }
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        )
                    } ) }
                    
                </Container>

                <Modal show={ modal } onHide={ handleModal } animation={true} centered>
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

                                    <Form.Control type="text" id="set_weight" name="set_weight" placeholder="중량을 입력해주세요." value={ weight } />

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

                                            <Form.Control type="text" id="set_reps" name="set_reps" placeholder="횟수를 입력해주세요." value={ reps } />

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

                                            <Form.Control type="text" id="set_max_reps" name="set_max_reps" placeholder="횟수를 입력해주세요." value={ maxReps } />

                                            <InputGroup.Append>
                                                <Button type="button" variant="outline-secondary" title="증가">
                                                    <FontAwesomeIcon icon={ faAngleUp } />                                                    
                                                </Button>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Form.Row>

                            <Form.Group>
                                <Form.Label htmlFor="set_rir">RIR</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="set_rir"
                                    id="set_rir"
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
                            <Button variant="secondary" onClick={ handleModal }>닫기</Button>
                            <Button variant="primary" onClick={ handleModal }>저장</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </main>
        </>
    )
}

export default Records
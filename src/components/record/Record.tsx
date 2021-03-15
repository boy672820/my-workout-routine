import React, { useEffect, useState } from 'react'
import {
    Container,
    Table,
    Button,
    Modal,
    Form,
    Card
} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBurn, faEdit } from "@fortawesome/free-solid-svg-icons"

import './record.css'
import { RoutineAPI } from '../../api/routine/routine.api'
import { useParams } from 'react-router-dom'


function Records() {
    const { block_id }: any = useParams()
    const [ modal, setModal ] = useState( false )
    const [ title, setTitle ] = useState( '' )
    const [ data, setData ] = useState<any[]>( [] )


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
    }, [ block_id ] )


    const handleModal = () => {
        setModal( ! modal )
    }

    const handleEdit = () => {
        handleModal()
    }


    return (
        <>
            <div className="record-date">
                <Container>
                    <h2 className="record-date-title">
                        <strong>(토요일)</strong> <span>{ title }</span>
                    </h2>
                    <p className="record-date-desc">2021년 2월 13일</p>
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
                                        <p className="no margin"><b>100kg</b>의 무게로 <b>6세트 4회</b> 진행하기</p>
                                    </div>
                                </Card.Header>
                                <Card.Body className="no padding">
                                    <Table className="record-item-table no margin text align center">
                                        <tbody>
                                            { item.sets.map( ( set: any, set_index: number ) => {
                                                return (
                                                    <tr key={ set_index }>
                                                        <td className="vertical align middle">
                                                            <div className="vertical align middle display inline block"><Form.Check type="checkbox" value={ set.ID } /></div>&nbsp;
                                                            <div className="record-item-set-title vertical align middle display inline block">{ set.set_number }세트</div>
                                                        </td>
                                                        <td className="vertical align middle">{ set.set_weight }kg</td>
                                                        <td className="vertical align middle">{ set.set_reps }{ set.set_disable_range ? '' : `~${set.set_max_reps}` }회</td>
                                                        <td className="vertical align middle">
                                                            <Button variant="link" title="수정하기" className="edit-button" onClick={ handleEdit }>
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
                            <Form.Group>
                                <Form.Label htmlFor="weight">중량</Form.Label>
                                <Form.Control type="text" id="weight" name="weight" placeholder="중량을 입력해주세요." />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="reps">횟수</Form.Label>
                                <Form.Control type="text" id="reps" name="reps" placeholder="횟수를 입력해주세요." />
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
import React, { Component } from 'react'
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


interface RecordPropsInterface {}
interface RecordStateInterface {
    modal: boolean
    checkedRows: number[]
}


class Records extends Component<RecordPropsInterface, RecordStateInterface> {
    
    constructor( props: RecordPropsInterface ) {
        super( props )

        this.state = {
            modal: false,
            checkedRows: []
        }

        // Event handlers.
        this.handleModal = this.handleModal.bind( this )
        this.handleEdit = this.handleEdit.bind( this )
        this.handleComplete = this.handleComplete.bind( this )
    }

    async handleModal() {
        this.setState( {
            modal: ! this.state.modal
        } )
    }

    async handleEdit() {
        this.handleModal() // Open modal.
    }

    async handleComplete( e: any ) {
        const { checked, dataset } = e.target
        const set_id = Number( dataset.id )
        const rows = this.state.checkedRows.slice()

        if ( checked ) await rows.push( set_id )
        else {
            const idx = await rows.indexOf( set_id )
            await rows.splice( idx, 1 )
        }

        this.setState( {
            checkedRows: rows
        } )
    }

    render() {

        const checkedRowStyle = ( id: number ) => {
            const isId = this.state.checkedRows.indexOf( id )
            return isId >= 0 ? 'record-item-complete-set' : ''
        }
        
        return (
            <>
                <div className="record-date">
                    <Container>
                        <h2 className="record-date-title">
                            <strong>토요일</strong> / <span>캔디토 상체 컨트롤데이</span>
                        </h2>
                        <p className="record-date-desc">2021년 2월 13일</p>
                    </Container>
                </div>

                <main className="main">
                    <Container>
                        <Card className="record-item">
                            <Card.Header>
                                <div className="record-item-header">
                                    <h4><FontAwesomeIcon icon={faBurn} style={{color: '#dc3545'}} />&nbsp;&nbsp;정지 벤치프레스</h4>
                                    <p className="no margin"><b>100kg</b>의 무게로 <b>6세트 4회</b> 진행하기</p>
                                </div>
                            </Card.Header>
                            <Card.Body className="no padding">
                                <Table className="record-item-table no margin text align center">
                                    <tbody>
                                        <tr className={ checkedRowStyle( 1 ) }>
                                            <td className="vertical align middle">
                                                <div className="vertical align middle display inline block"><Form.Check type="checkbox" onChange={this.handleComplete} data-id={ 1 } /></div>
                                                <div className="record-item-set-title vertical align middle display inline block">1세트</div>
                                            </td>
                                            <td className="vertical align middle">100kg</td>
                                            <td className="vertical align middle">4회</td>
                                            <td className="vertical align middle">
                                                <Button variant="link" title="수정하기" className="edit-button" onClick={ this.handleEdit }>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr className={ checkedRowStyle( 2 ) }>
                                            <td className="vertical align middle">
                                                <div className="vertical align middle display inline block"><Form.Check type="checkbox" onChange={this.handleComplete} data-id={ 2 } /></div>&nbsp;
                                                <div className="record-item-set-title vertical align middle display inline block">2세트</div>
                                            </td>
                                            <td className="vertical align middle">100kg</td>
                                            <td className="vertical align middle">4회</td>
                                            <td className="vertical align middle">
                                                <Button variant="link" title="수정하기" className="edit-button" onClick={ this.handleEdit }>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr className={ checkedRowStyle( 3 ) }>
                                            <td className="vertical align middle">
                                                <div className="vertical align middle display inline block"><Form.Check type="checkbox" onChange={this.handleComplete} data-id={ 3 } /></div>&nbsp;
                                                <div className="record-item-set-title vertical align middle display inline block">3세트</div>
                                            </td>
                                            <td className="vertical align middle">100kg</td>
                                            <td className="vertical align middle">4회</td>
                                            <td className="vertical align middle">
                                                <Button variant="link" title="수정하기" className="edit-button" onClick={ this.handleEdit }>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr className={ checkedRowStyle( 4 ) }>
                                            <td className="vertical align middle">
                                                <div className="vertical align middle display inline block"><Form.Check type="checkbox" onChange={this.handleComplete} data-id={ 4 } /></div>&nbsp;
                                                <div className="record-item-set-title vertical align middle display inline block">4세트</div>
                                            </td>
                                            <td className="vertical align middle">100kg</td>
                                            <td className="vertical align middle">4회</td>
                                            <td className="vertical align middle">
                                                <Button variant="link" title="수정하기" className="edit-button" onClick={ this.handleEdit }>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr className={ checkedRowStyle( 5 ) }>
                                            <td className="vertical align middle">
                                                <div className="vertical align middle display inline block"><Form.Check type="checkbox" onChange={this.handleComplete} data-id={ 5 } /></div>&nbsp;
                                                <div className="record-item-set-title vertical align middle display inline block">5세트</div>
                                            </td>
                                            <td className="vertical align middle">100kg</td>
                                            <td className="vertical align middle">4회</td>
                                            <td className="vertical align middle">
                                                <Button variant="link" title="수정하기" className="edit-button" onClick={ this.handleEdit }>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr className={ checkedRowStyle( 6 ) }>
                                            <td className="vertical align middle">
                                                <div className="vertical align middle display inline block"><Form.Check type="checkbox" onChange={this.handleComplete} data-id={ 6 } /></div>&nbsp;
                                                <div className="record-item-set-title vertical align middle display inline block">6세트</div>
                                            </td>
                                            <td className="vertical align middle">100kg</td>
                                            <td className="vertical align middle">4회</td>
                                            <td className="vertical align middle">
                                                <Button variant="link" title="수정하기" className="edit-button" onClick={ this.handleEdit }>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Container>

                    <Modal show={this.state.modal} onHide={this.handleModal} animation={true}>
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
                                <Button variant="secondary" onClick={this.handleModal}>닫기</Button>
                                <Button variant="primary" onClick={this.handleModal}>저장</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </main>
            </>
        )
    }
}

export default Records
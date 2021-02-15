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
}


class Records extends Component<RecordPropsInterface, RecordStateInterface> {
    
    constructor( props: RecordPropsInterface ) {
        super( props )

        this.state = {
            modal: false
        }

        this.handleModal = this.handleModal.bind( this )
        this.handleEdit = this.handleEdit.bind( this )
        this.handleComplete = this.handleComplete.bind( this )
    }

    handleModal() {
        this.setState( {
            modal: ! this.state.modal
        } )
    }

    handleEdit() {
        this.handleModal() // Open modal.
    }

    handleComplete() {
        console.log( 'test' )
    }

    render() {
        return (
            <main className="main">
                <Container>

                    <div className="record-header">
                        <h2 className="record-header-title">2021년 2월 13일</h2>
                        <h3 className="record-header-desc">
                            <strong>토요일</strong> / <span>캔디토 상체 컨트롤데이</span>
                        </h3>
                    </div>

                    <Card>
                        <Card.Header>
                            <div className="record-item-header">
                                <h4><FontAwesomeIcon icon={faBurn} style={{color: '#dc3545'}} />&nbsp;&nbsp;정지 벤치프레스</h4>
                                <p className="no margin"><b>100kg</b>의 무게로 <b>6세트 4회</b> 진행하기</p>
                            </div>
                        </Card.Header>
                        <Card.Body className="no padding">
                            <Table className="record-item-table no margin text align center">
                                <tbody>
                                    <tr className="record-item-complete-set">
                                        <td className="vertical align middle">
                                            <div className="vertical align middle display inline block"><Form.Check type="checkbox" onChange={this.handleComplete} /></div>
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
                                    <tr>
                                        <td className="vertical align middle">
                                            <div className="vertical align middle display inline block"><Form.Check type="checkbox" /></div>&nbsp;
                                            <div className="vertical align middle display inline block">2세트</div>
                                        </td>
                                        <td className="vertical align middle">100kg</td>
                                        <td className="vertical align middle">4회</td>
                                        <td className="vertical align middle">
                                            <Button variant="link" title="수정하기" className="edit-button" onClick={ this.handleEdit }>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="vertical align middle">
                                            <div className="vertical align middle display inline block"><Form.Check type="checkbox" /></div>&nbsp;
                                            <div className="vertical align middle display inline block">3세트</div>
                                        </td>
                                        <td className="vertical align middle">100kg</td>
                                        <td className="vertical align middle">4회</td>
                                        <td className="vertical align middle">
                                            <Button variant="link" title="수정하기" className="edit-button" onClick={ this.handleEdit }>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="vertical align middle">
                                            <div className="vertical align middle display inline block"><Form.Check type="checkbox" /></div>&nbsp;
                                            <div className="vertical align middle display inline block">4세트</div>
                                        </td>
                                        <td className="vertical align middle">100kg</td>
                                        <td className="vertical align middle">4회</td>
                                        <td className="vertical align middle">
                                            <Button variant="link" title="수정하기" className="edit-button" onClick={ this.handleEdit }>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="vertical align middle">
                                            <div className="vertical align middle display inline block"><Form.Check type="checkbox" /></div>&nbsp;
                                            <div className="vertical align middle display inline block">5세트</div>
                                        </td>
                                        <td className="vertical align middle">100kg</td>
                                        <td className="vertical align middle">4회</td>
                                        <td className="vertical align middle">
                                            <Button variant="link" title="수정하기" className="edit-button" onClick={ this.handleEdit }>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="vertical align middle">
                                            <div className="vertical align middle display inline block"><Form.Check type="checkbox" /></div>&nbsp;
                                            <div className="vertical align middle display inline block">6세트</div>
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
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModal}>Close</Button>
                        <Button variant="primary" onClick={this.handleModal}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </main>
        )
    }
}

export default Records
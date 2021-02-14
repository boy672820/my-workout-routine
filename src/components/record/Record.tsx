import React, { Component } from 'react'
import {
    Container,
    Table,
    Button,
    Modal
} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBurn, faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons"

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

        this.handleModal.bind( this )
    }

    handleModal() {
        this.setState( {
            modal: ! this.state.modal
        } )
    }
    
    render() {
        return (
            <main className="main">
                <Container>

                    <div className="record-header">
                        <h2>2021년 2월 13일</h2>
                        <p>
                            <strong>토요일</strong> / <span>캔디토 상체 컨트롤데이</span>
                        </p>
                    </div>

                    <Table>
                        <tbody>
                            <tr>
                                <td className="vertical align middle"><FontAwesomeIcon icon={faCheckCircle} />&nbsp;<strong>정지 벤치프레스</strong></td>
                                <td className="vertical align middle" width="95">6세트 4회</td>
                                <td className="vertical align middle" width="15"><Button variant="link" size="sm" title="기록 작성하기" style={{ color: '#dc3545' }}><FontAwesomeIcon icon={faBurn} /></Button></td>
                            </tr>
                            <tr>
                                <td className="vertical align middle"><FontAwesomeIcon icon={faCircle} />&nbsp;<strong>펜들레이 로우</strong></td>
                                <td className="vertical align middle">3세트 4회</td>
                                <td className="vertical align middle"><Button variant="link" size="sm" title="기록 작성하기" style={{ color: '#dc3545' }}><FontAwesomeIcon icon={faBurn} /></Button></td>
                            </tr>
                            <tr className="inactive">
                                <td className="vertical align middle"><FontAwesomeIcon icon={faCircle} />&nbsp;<strong>오버 헤드 프레스</strong></td>
                                <td className="vertical align middle">6세트 4회</td>
                                <td className="vertical align middle"><Button variant="link" size="sm" title="기록 작성하기"><FontAwesomeIcon icon={faBurn} /></Button></td>
                            </tr>
                            <tr className="inactive">
                                <td className="vertical align middle"><FontAwesomeIcon icon={faCircle} />&nbsp;<strong>풀업</strong></td>
                                <td className="vertical align middle">3세트 12회</td>
                                <td className="vertical align middle"><Button variant="link" size="sm" title="기록 작성하기"><FontAwesomeIcon icon={faBurn} /></Button></td>
                            </tr>
                            <tr className="inactive">
                                <td className="vertical align middle"><FontAwesomeIcon icon={faCircle} />&nbsp;<strong>라잉 트라이셉스 익스텐션</strong></td>
                                <td className="vertical align middle">4세트 8~10회</td>
                                <td className="vertical align middle"><Button variant="link" size="sm" title="기록 작성하기"><FontAwesomeIcon icon={faBurn} /></Button></td>
                            </tr>
                            <tr className="inactive">
                                <td className="vertical align middle"><FontAwesomeIcon icon={faCircle} />&nbsp;<strong>랫 풀 다운</strong></td>
                                <td className="vertical align middle">3세트 10~12회</td>
                                <td className="vertical align middle"><Button variant="link" size="sm" title="기록 작성하기"><FontAwesomeIcon icon={faBurn} /></Button></td>
                            </tr>
                        </tbody>
                    </Table>
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
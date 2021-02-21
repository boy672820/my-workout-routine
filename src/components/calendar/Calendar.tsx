import React, { Component } from 'react'
import {
    Container,
    Table,
    Card,
    Modal,
    Form,
    Button
} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBurn, faEdit, faPlusCircle } from "@fortawesome/free-solid-svg-icons"

import { CalendarPropsInterface, CalendarStateInterface } from './calendar.interface'
import { CreateAPI } from '../../api/create/create.api'

import './calendar.css'


class Calendar extends Component<CalendarPropsInterface, CalendarStateInterface> {

    constructor( props: CalendarPropsInterface ) {
        super( props )

        this.state = {
            modal: false,
            modal_title: '',
            routine_id: null,
            block_title: ''
        }

        this.handleChange = this.handleChange.bind( this )
        this.handleModal = this.handleModal.bind( this )
        this.handleCreateBlock = this.handleCreateBlock.bind( this )
        this.handleSubmit = this.handleSubmit.bind( this )
    }

    async handleChange( e: React.ChangeEvent<HTMLInputElement> ) {
        const { value } = e.target

        this.setState( { block_title: value } )
    }

    async handleModal() {
        this.setState( {
            modal: ! this.state.modal
        } )
    }

    async handleCreateBlock( routine_id: number, date_string: string ) {
        this.handleModal()

        const date = new Date( date_string )
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const d = date.getDate()
        const day = date.getDay()
        const week = [ '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일' ]

        this.setState( {
            routine_id: routine_id,
            modal_title: `${year}년 ${month}월 ${d}일 ${week[ day ]}`
        } )
    }

    async handleSubmit( e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault()

        if ( this.state.routine_id ) {
            const data = {
                routine_id: this.state.routine_id,
                block_title: this.state.block_title
            }
            const response = CreateAPI.createBlock( data )

            response.then( ( { data } ) => {
                this.props.history.push( `/create/exercise/${data.ID}` )
            } ).catch( err => {
                console.log( err )
            } )
        }

        else alert( '잘못 된 접근입니다.')
    }

    render() {
        return (
            <main className="main">
                <Container>

                    <header className="calendar-header">
                        <h3>2021년 2월</h3>
                    </header>

                    <Card>
                        <Card.Body className="no padding">
                            <Table className="no margin">
                                <thead>
                                    <tr>
                                        <th className="text align center">날짜</th>
                                        <th>내용</th>
                                        <th className="text align center">기록</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="vertical text align middle center">1(월)</td>
                                        <td className="vertical align middle"><FontAwesomeIcon icon={ faBurn } style={ { color: '#dc3545' } } />&nbsp;캔디토 상체 컨트롤데이</td>
                                        <td className="vertical text align middle center">
                                            <Button variant="link" className="no padding">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="vertical text align middle center">2(화)</td>
                                        <td className="vertical align middle"><FontAwesomeIcon icon={ faBurn } />&nbsp;캔디토 하체 컨트롤데이</td>
                                        <td className="vertical text align middle center">
                                            <Button variant="link" className="no padding">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="vertical text align middle center">3(수)</td>
                                        <td className="vertical align middle"><FontAwesomeIcon icon={ faBurn } />&nbsp;캔디토 하체 컨트롤데이</td>
                                        <td className="vertical text align middle center">
                                            <Button variant="link" className="no padding">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="vertical text align middle center">4(목)</td>
                                        <td className="vertical align middle"><FontAwesomeIcon icon={ faBurn } />&nbsp;캔디토 하체 컨트롤데이</td>
                                        <td className="vertical text align middle center">
                                            <Button variant="link" className="no padding">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="vertical text align middle center">5(금)</td>
                                        <td className="vertical align middle"><FontAwesomeIcon icon={ faBurn } />&nbsp;캔디토 하체 컨트롤데이</td>
                                        <td className="vertical text align middle center">
                                            <Button variant="link" className="no padding">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="vertical text align middle center">6(토)</td>
                                        <td className="vertical align middle"><FontAwesomeIcon icon={ faBurn } />&nbsp;캔디토 하체 컨트롤데이</td>
                                        <td className="vertical text align middle center">
                                            <Button variant="link" className="no padding">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="vertical text align middle center">7(일)</td>
                                        <td className="vertical align middle"><b className="no-record">운동 기록이 없습니다.</b></td>
                                        <td className="vertical text align middle center">
                                            <Button variant="link" className="no padding" onClick={ () => this.handleCreateBlock( 1, '2021/2/7' ) } title="운동기록 작성하기">
                                                <FontAwesomeIcon icon={ faPlusCircle } />
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>

                    <Modal show={ this.state.modal } onHide={ this.handleModal } animation={ true }>
                        <Form onSubmit={ this.handleSubmit }>
                            <Modal.Header closeButton>
                                <Modal.Title>{ this.state.modal_title }</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group>
                                    <Form.Label htmlFor="block_title">블럭 제목</Form.Label>
                                    <Form.Control type="text" id="block_title" name="block_title" placeholder="블럭 제목 입력해주세요." onChange={ this.handleChange } value={ this.state.block_title } />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={ this.handleModal }>닫기</Button>
                                <Button variant="primary" type="submit">운동 종목 선택하기</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>

                </Container>
            </main>
        )
    }

}

export default Calendar
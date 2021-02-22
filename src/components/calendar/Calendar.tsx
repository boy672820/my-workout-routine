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
import { RoutineAPI } from '../../api/routine/routine.api'

import './calendar.css'


class Calendar extends Component<CalendarPropsInterface, CalendarStateInterface> {

    constructor( props: CalendarPropsInterface ) {
        super( props )

        this.state = {
            modal: false,
            modal_title: '',
            routine_id: null,
            routine_date: '',
            block_title: '',
            nowDate: { year: 0, month: 0, date: 0 },
            blocks: {}
        }

        this.handleChange = this.handleChange.bind( this )
        this.handleModal = this.handleModal.bind( this )
        this.handleCreateBlock = this.handleCreateBlock.bind( this )
        this.handleSubmit = this.handleSubmit.bind( this )
    }

    private week = [ '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일' ]

    componentDidMount() {
        // Set now date.
        RoutineAPI.nowDate()
            .then( ( { data } ) => {
                this.setState( { nowDate: data } )
            } )

            // Set active routine id.
        RoutineAPI.getActiveRoutine( 'test@mwr.com' )
            .then( ( { data } ) => {
                this.setState( { routine_id: data.ID } )

                // Set routine blocks.
                const getRoutineDates = RoutineAPI.getRoutineDates( data.ID )

                getRoutineDates.then( response => {
                    this.setState( { blocks: response.data } )
                } )
            } )
    }

    async handleChange( e: React.ChangeEvent<HTMLInputElement> ) {
        const { value } = e.target

        this.setState( { block_title: value } )
    }

    async handleModal() {
        const { modal } = this.state

        this.setState( { modal: ! modal } )
    }

    async handleCreateBlock( e: React.MouseEvent<HTMLButtonElement> ) {
        this.handleModal()

        const date_string = e.currentTarget.dataset.date_string as string

        console.log( date_string )

        const date = new Date( date_string )
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const d = date.getDate()
        const day = date.getDay()

        this.setState( {
            routine_date: date_string,
            modal_title: `${year}년 ${month}월 ${d}일 ${this.week[ day ]}`
        } )
    }

    async handleSubmit( e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault()

        if ( this.state.routine_id ) {
            const data = {
                routine_id: this.state.routine_id,
                routine_date: this.state.routine_date,
                block_title: this.state.block_title
            }
            const response = RoutineAPI.createBlock( data )

            response.then( ( { data } ) => {
                this.props.history.push( `/create/exercise/${data.ID}` )
            } ).catch( err => {
                console.log( err )
            } )
        }

        else alert( '잘못 된 접근입니다.')
    }

    render() {
        const { year, month } = this.state.nowDate
        const last_date = new Date( year, month, 0 ).getDate()

        return (
            <main className="main">
                <Container>

                    <header className="calendar-header">
                        <h3>{ year }년 { month }월</h3>
                    </header>

                    <Card className="calendar-body">
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
                                    { ( ( that ) => {
                                        const rows = []
                                        let i = 1
                                        const { blocks } = that.state
                                        const keys = Object.keys( blocks )
                                        const today = new Date( Date.now() )

                                        for ( i; i <= last_date; i += 1 ) {
                                            const day = new Date( year, month, i ).getDay()
                                            const week = that.week[ day ][ 0 ]
                                            const ymd = `${year}/${month}/${i}`
                                            const is_today = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}` === ymd ? 'today' : ''
                                            const is_weekend = day === 0 || day === 6 ? 'weekend ' : ''

                                            const key_index = keys.indexOf( ymd )

                                            if ( key_index < 0 ) {
                                                rows.push(
                                                    <tr key={ i }>
                                                        <td className={ "vertical text align middle center td " + is_weekend + is_today }>
                                                            <span className={ 'day ' + is_weekend + is_today }>{ i }({ week })</span>
                                                        </td>
                                                        <td className={ "vertical align middle td td " + is_weekend + is_today }>
                                                            <b className="no-record">운동 기록이 없습니다.</b>
                                                        </td>
                                                        <td className={ "vertical text align middle center td " + is_weekend + is_today }>
                                                            <Button variant="link" className="no padding" onClick={ that.handleCreateBlock } data-date_string={ ymd } title="운동기록 작성하기">
                                                                <FontAwesomeIcon icon={ faPlusCircle } />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                            else {
                                                rows.push(
                                                    <tr key={ i }>
                                                        <td className={ "vertical text align middle center td " + is_weekend + is_today }>
                                                            <span className={ 'day ' + is_weekend + is_today }>{ i }({ week })</span>
                                                        </td>
                                                        <td className={ "vertical align middle td " + is_weekend + is_today }>
                                                            <FontAwesomeIcon icon={ faBurn } style={ { color: '#dc3545' } } />&nbsp;
                                                            { blocks[ ymd ].block_title }
                                                        </td>
                                                        <td className={ "vertical text align middle center td " + is_weekend + is_today }>
                                                            <Button variant="link" className="no padding" title="운동기록 수정하기">
                                                                <FontAwesomeIcon icon={faEdit} />
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                )
                                            }
                                        }

                                        return rows
                                    } )( this ) }
                                    
                                    {/* <tr>
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
                                    </tr> */}
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
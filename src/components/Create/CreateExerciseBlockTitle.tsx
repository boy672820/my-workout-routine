import React, { Component } from 'react'
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    Form,
    OverlayTrigger,
    Popover
} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faChevronLeft } from "@fortawesome/free-solid-svg-icons"

import { RoutineAPI } from '../../api/routine/routine.api'
import { RoutineUpdateBlockDTO } from '../../api/routine/dto/routine.update.block.dto'


interface PropsInterface {
    block_id: number
    history: any
}
interface StateInterface {
    block_title: string
    edit_block_title: string
    modal: boolean
    popover: boolean
}


class CreateExerciseBlockTitle extends Component<PropsInterface, StateInterface> {

    constructor( props: PropsInterface ) {
        super( props )

        this.state = {
            block_title: '',
            edit_block_title: '',
            modal: false,
            popover: false
        }

        this.handleModal = this.handleModal.bind( this )
        this.handlePopover = this.handlePopover.bind( this )
        this.handleChange = this.handleChange.bind( this )
        this.handleSubmit = this.handleSubmit.bind( this )
        this.handleRemove = this.handleRemove.bind( this )
    }

    componentDidMount() {
        const { block_id } = this.props

        // Get block and set block title.
        RoutineAPI.getBlock( block_id ).then( response => {
            this.setState( {
                block_title: response.data.block_title,
                edit_block_title: response.data.block_title,
            } )
        } )
    }

    async handleModal() {
        const { modal } = this.state

        this.setState( {
            modal: !modal,
            popover: false
        } )
    }

    async handleChange( e: React.ChangeEvent<HTMLInputElement> ) {
        const { value } = e.target

        this.setState( {
            edit_block_title: value
        } )
    }

    async handlePopover() {
        const { popover } = this.state

        this.setState( {
            popover: !popover
        } )
    }

    async handleSubmit( e: React.FormEvent<HTMLFormElement> ) {
        e.preventDefault()

        const { edit_block_title } = this.state

        const data: RoutineUpdateBlockDTO = {
            ID: this.props.block_id,
            block_title: edit_block_title
        }
        RoutineAPI.updateBlock( data ).then( response => {
            if ( response.data.raw.serverStatus === 2 ) {
                this.setState( {
                    block_title: edit_block_title
                } )
                this.handleModal()
            }
        } )

    }

    async handleRemove() {
        const { block_id } = this.props

        RoutineAPI.removeBlock( block_id ).then( response => {
            if ( response.data.raw.serverStatus === 2 ) {
                this.props.history.push( '/' )
            }
        } )
    }

    render() {
        return (
            <div className="create-exercise-nav">
                <div className="create-exercise-block-title">
                    <Container>
                        <Row>
                            <Col xs="3" sm="3" md="4" lg="4">
                                <Button variant="link" className="nav-previous icon-button">
                                    <FontAwesomeIcon icon={faChevronLeft} className="button-icon" />
                                    뒤로
                                </Button>
                            </Col>
                            <Col xs="6" sm="6" md="4" lg="4" className="text align center">
                                <h4 className="create-exercise-block-h">
                                    { this.state.block_title }
                                </h4>
                            </Col>
                            <Col xs="3" sm="3" md="4" lg="4" className="text align right">
                                <Button variant="link" title="블럭 제목 수정하기" onClick={ this.handleModal }>
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Modal show={ this.state.modal } onHide={ this.handleModal } centered>
                    <form onSubmit={ this.handleSubmit }>
                        <Modal.Header>
                            <Modal.Title>"{ this.state.block_title }" 수정</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label htmlFor="block_title">블록명</Form.Label>
                                <Form.Control id="block_title" name="block_title" onChange={ this.handleChange } value={ this.state.edit_block_title } />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" type="button" size="lg" onClick={ this.handleModal }>닫기</Button>
                            <OverlayTrigger
                                trigger="click"
                                placement="bottom"
                                show={ this.state.popover }
                                overlay={
                                <Popover id="remove-block-check-popover">
                                    <Popover.Title as="h3">"{ this.state.block_title }" 블럭을 정말로 삭제 하실건가요?</Popover.Title>
                                    <Popover.Content className="text align center">
                                        <Button variant="outline-success" type="button" size="sm" onClick={ this.handlePopover }>아니요.</Button>&nbsp;
                                        <Button variant="outline-danger" type="button" size="sm" onClick={ this.handleRemove }>네 삭제할거에요.</Button>
                                    </Popover.Content>
                                </Popover>
                                }                      
                            >
                                <Button variant="danger" type="button" size="lg" onClick={ this.handlePopover }>삭제</Button>
                            </OverlayTrigger>
                            <Button type="submit" size="lg">수정하기</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default CreateExerciseBlockTitle
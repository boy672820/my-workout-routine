import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBurn } from "@fortawesome/free-solid-svg-icons"
import {
    Modal,
    Form,
    Button
} from 'react-bootstrap'

import CreateEditSet from './CreateEditSet'


interface CreateEditSetModalPropsInterface {
    parent: any
    prefix: string
}

interface CreateEditSetModalStateInterface {}


class CreateEditSetModal extends Component<CreateEditSetModalPropsInterface, CreateEditSetModalStateInterface> {

    constructor( props: CreateEditSetModalPropsInterface ) {
        super( props )

        this.state = {}
    }

    render() {
        const { parent, prefix } = this.props

        return (
            <Modal size="lg" show={ parent.state.edit_set_modal } onHide={ parent.handleEditSetModal } centered>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <FontAwesomeIcon icon={ faBurn } />&nbsp;
                            세트 수정
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <CreateEditSet parent={ parent } prefix={ prefix } />

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" type="button" size="lg" onClick={ parent.handleEditSetModal }>닫기</Button>
                        <Button type="button" size="lg">수정하기</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default CreateEditSetModal
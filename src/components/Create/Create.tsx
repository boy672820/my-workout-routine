import React, { Component } from 'react'
import {
    Container,
    Form,
    InputGroup,
    Col,
    Card,
    Button,
    ToggleButton,
    ButtonGroup,
    OverlayTrigger,
    Popover
} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDown, faAngleUp, faQuestionCircle } from "@fortawesome/free-solid-svg-icons"

import { CreatePropsInterface, CreateStateInterface } from './create.interface'
import './create.css'


class Create extends Component<CreatePropsInterface, CreateStateInterface> {

    constructor( props: CreatePropsInterface ) {
        super( props )

        this.state = {
            disable_range: true
        }

        this.handleRange = this.handleRange.bind( this )
    }

    async handleRange( e: React.ChangeEvent<HTMLInputElement> ) {
        const { checked } = e.target

        this.setState( {
            disable_range: !checked
        } )
    }

    render() {
        return (
            <main className="main">

                <Container>

                    <header className="create-header">
                        <h5>운동 일정 작성</h5>
                    </header>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label htmlFor="exercise_name">종목</Form.Label>
                                    <Form.Control type="text" name="exercise_name" id="exercise_name" placeholder="종목을 입력해주세요." />
                                </Form.Group>

                                <Form.Row>
                                    <Col xs={6}>
                                        <Form.Group>
                                            <Form.Label htmlFor="set_number">세트</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <Button variant="outline-secondary" title="감소"><FontAwesomeIcon icon={ faAngleDown } /></Button>
                                                </InputGroup.Prepend>
                                                <Form.Control type="text" name="set_number" id="set_number" placeholder="세트" />
                                                <InputGroup.Append>
                                                    <Button variant="outline-secondary" title="증가"><FontAwesomeIcon icon={ faAngleUp } /></Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>

                                    <Col xs={6}>
                                        <Form.Group className="no margin">
                                            <Form.Label htmlFor="set_reps">횟수</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <Button variant="outline-secondary" title="감소"><FontAwesomeIcon icon={ faAngleDown } /></Button>
                                                </InputGroup.Prepend>
                                                <Form.Control type="text" name="set_reps" id="set_reps" placeholder="횟수" />
                                                <InputGroup.Append>
                                                    <Button variant="outline-secondary" title="증가"><FontAwesomeIcon icon={ faAngleUp } /></Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="disable-group no margin">
                                            <Form.Check type="checkbox" name="disable_range" id="disable_range" className="label-checkbox" onChange={ this.handleRange } />
                                            <label htmlFor="disable_range" className="label-text">최대 횟수 사용</label>
                                        </Form.Group>

                                        <Form.Group>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <Button variant="outline-secondary" title="감소"><FontAwesomeIcon icon={ faAngleDown } /></Button>
                                                </InputGroup.Prepend>
                                                <Form.Control type="text" name="set_max_reps" id="set_max_reps" placeholder="최대 횟수" disabled={this.state.disable_range} />
                                                <InputGroup.Append>
                                                    <Button variant="outline-secondary" title="증가"><FontAwesomeIcon icon={ faAngleUp } /></Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Form.Row>

                                <Form.Group>
                                    <Form.Label htmlFor="weight">중량</Form.Label>

                                    <Form.Group className="weight-group">
                                        <ButtonGroup toggle aria-label="증가할 중량">
                                            <ToggleButton type="radio" value="2.5" checked={false} variant="secondary" size="sm">2.5kg</ToggleButton>
                                            <ToggleButton type="radio" value="5" checked={false} variant="secondary" size="sm">5kg</ToggleButton>
                                            <ToggleButton type="radio" value="10" checked={false} variant="secondary" size="sm">10kg</ToggleButton>
                                            <ToggleButton type="radio" value="15" checked={false} variant="secondary" size="sm">15kg</ToggleButton>
                                            <ToggleButton type="radio" value="20" checked={false} variant="secondary" size="sm">20kg</ToggleButton>
                                            <ToggleButton type="radio" value="25" checked={false} variant="secondary" size="sm">25kg</ToggleButton>
                                        </ButtonGroup>
                                    </Form.Group>

                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <Button variant="outline-secondary" title="감소"><FontAwesomeIcon icon={faAngleDown} /></Button>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text" name="weight" id="weight" placeholder="중량을 입력해주세요." />
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" title="증가"><FontAwesomeIcon icon={faAngleUp} /></Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="weight">
                                        RIR(Repetitions In Reserve)&nbsp;
                                        <OverlayTrigger trigger="click" placement="top" overlay={
                                            <Popover id="popover-basic">
                                                <Popover.Title as="h3">*RIR(Repetitions In Reserve)</Popover.Title>
                                                <Popover.Content>
                                                    절대 피로에 도달하기 전에 남은 횟수를 추정하여 운동 강도를 측정하는 지표 입니다.<br />
                                                    예를 들어, 벤치프레스를 100kg으로 최대 8회까지 가능한 사람이 6회를 진행한다면 해당 훈련은 2RIR로 진행하게 됩니다.<br />
                                                    반대로 이 사람이 100kg을 8회로 운동을 수행하면 0RIR이 됩니다.
                                                </Popover.Content>
                                            </Popover>
                                        }>
                                            <button className="btn-init" type="button">
                                                <FontAwesomeIcon icon={ faQuestionCircle } className="vertical align middle" />
                                            </button>
                                        </OverlayTrigger>
                                        
                                    </Form.Label>
                                    <Form.Control type="text" name="weight" id="weight" placeholder="RIR을 입력해주세요." />
                                </Form.Group>

                                <Button variant="primary" type="submit" size="lg" className="create-submit-btn">저장</Button>
                            </Form>
                        </Card.Body>
                    </Card>

                </Container>


            </main>
        )    
    }
}

export default Create
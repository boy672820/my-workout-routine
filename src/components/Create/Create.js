import React, { Component } from 'react'
import {
    Button,
    Form,
    Col,
    Card,
    Table,
    Container
} from 'react-bootstrap'

import WeightControl from './WeightControl'
import SetsControl from './SetsControl'

import './create.css'


class Create extends Component {

    
    state = {
        weight: 10,
        sets: 1
    }


    /**
     * Control from child component.
     */
    handleChild = ( res ) => {
        this.setState( res );
    }


    render() {

        return (

            <div className="create-container">

                <div className="container">

                    <Card>
                        <Card.Body>

                            <h2>Create routine</h2>

                            <Form>

                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Exercise</Form.Label>
                                    <Form.Control type="text" placeholder="Enter exercise." />
                                </Form.Group>

                                <WeightControl defaultValue={this.state.weight} handleChild={this.handleChild} />

                                <SetsControl defaultValue={this.state.sets} handleChild={this.handleChild} />

                                <Form.Group>
                                    <Form.Label>Reps</Form.Label>
                                    <Form.Row className="align-items-center">
                                        <Col xs="auto">
                                            <Form.Control as="select">
                                                {[...Array(100)].map((n, index) => {
                                                    return (
                                                        <option key={index}>{index + 1}</option>
                                                    )
                                                })}
                                            </Form.Control>
                                        </Col>

                                        <Col xs="auto">
                                            <Form.Check type="checkbox" label="Add range." />
                                        </Col>

                                        <Col xs="auto">
                                            <Form.Control as="select">
                                                {[...Array(100)].map((n, index) => {
                                                    return (
                                                        <option key={index}>{index + 1}</option>
                                                    )
                                                })}
                                            </Form.Control>
                                        </Col>
                                    </Form.Row>
                                </Form.Group>

                                <Button variant="primary" type="submit">Submit</Button>

                            </Form>

                        </Card.Body>
                    </Card>
                </div>

                <div className="container">

                    <hr />

                    <Container>

                        <h3>Squat</h3>

                        <Table className="exercise-volum-table" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Preview</th>
                                    <th>Set</th>
                                    <th>weight(kg)</th>
                                    <th>Reps</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>1Set / 82.5kg / 8~10Reps</td>
                                    <td>1</td>
                                    <td>82.5</td>
                                    <td>8~10</td>
                                    <td className="text align center"><Button variant="outline-danger" size="sm">X</Button></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>2Set / 82.5kg / 8~10Reps</td>
                                    <td>2</td>
                                    <td>82.5</td>
                                    <td>8~10</td>
                                    <td className="text align center"><Button variant="outline-danger" size="sm">X</Button></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>3Set / 82.5kg / 8~10Reps</td>
                                    <td>3</td>
                                    <td>82.5</td>
                                    <td>8~10</td>
                                    <td className="text align center"><Button variant="outline-danger" size="sm">X</Button></td>
                                </tr>
                            </tbody>
                        </Table>

                    </Container>

                    <Container>

                        <h3>Hip thrust</h3>

                        <Table className="exercise-volum-table" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Preview</th>
                                    <th>Set</th>
                                    <th>weight(kg)</th>
                                    <th>Reps</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>1Set / 50kg / 10~12Reps</td>
                                    <td>1</td>
                                    <td>50</td>
                                    <td>10~12</td>
                                    <td className="text align center"><Button variant="outline-danger" size="sm">X</Button></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>2Set / 50kg / 10~12Reps</td>
                                    <td>2</td>
                                    <td>50</td>
                                    <td>10~12</td>
                                    <td className="text align center"><Button variant="outline-danger" size="sm">X</Button></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>3Set / 50kg / 10~12Reps</td>
                                    <td>3</td>
                                    <td>50</td>
                                    <td>10~12</td>
                                    <td className="text align center"><Button variant="outline-danger" size="sm">X</Button></td>
                                </tr>
                            </tbody>
                        </Table>

                    </Container>

                    <Container>

                        <h3>Leg curl</h3>

                        <Table className="exercise-volum-table" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Preview</th>
                                    <th>Set</th>
                                    <th>weight(kg)</th>
                                    <th>Reps</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>1Set / 45kg / 12~14Reps</td>
                                    <td>1</td>
                                    <td>45</td>
                                    <td>12~14</td>
                                    <td className="text align center"><Button variant="outline-danger" size="sm">X</Button></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>2Set / 45kg / 12~14Reps</td>
                                    <td>2</td>
                                    <td>45</td>
                                    <td>12~14</td>
                                    <td className="text align center"><Button variant="outline-danger" size="sm">X</Button></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>3Set / 45kg / 12~14Reps</td>
                                    <td>3</td>
                                    <td>45</td>
                                    <td>12~14</td>
                                    <td className="text align center"><Button variant="outline-danger" size="sm">X</Button></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>4Set / 45kg / 12~14Reps</td>
                                    <td>4</td>
                                    <td>45</td>
                                    <td>12~14</td>
                                    <td className="text align center"><Button variant="outline-danger" size="sm">X</Button></td>
                                </tr>
                            </tbody>
                        </Table>

                    </Container>

                    <Container>

                        <h3>Calves</h3>

                        <Table className="exercise-volum-table" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Preview</th>
                                    <th>Set</th>
                                    <th>weight(kg)</th>
                                    <th>Reps</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>1Set / 45kg / 13~15Reps</td>
                                    <td>1</td>
                                    <td>52.5</td>
                                    <td>13~15</td>
                                    <td className="text align center"><Button variant="outline-danger" size="sm">X</Button></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>2Set / 45kg / 13~15Reps</td>
                                    <td>2</td>
                                    <td>52.5</td>
                                    <td>13~15</td>
                                    <td className="text align center"><Button variant="outline-danger" size="sm">X</Button></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>3Set / 45kg / 13~15Reps</td>
                                    <td>3</td>
                                    <td>52.5</td>
                                    <td>13~15</td>
                                    <td className="text align center"><Button variant="outline-danger" size="sm">X</Button></td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>4Set / 45kg / 13~15Reps</td>
                                    <td>4</td>
                                    <td>52.5</td>
                                    <td>13~15</td>
                                    <td className="text align center"><Button variant="outline-danger" size="sm">X</Button></td>
                                </tr>
                            </tbody>
                        </Table>

                    </Container>

                </div>

            </div> //.create-container

        )
    }
}

export default Create
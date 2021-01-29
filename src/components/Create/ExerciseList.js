import React, { Component } from 'react'
import {
    Button,
    Table,
    Container,
    Row,
    Col
} from 'react-bootstrap'


class ExerciseList extends Component {

    render() {

        return (
            <div className="container">

                <hr />

                {this.props.data.map( ( row, index ) => {
                    return (
                        <Container key={index}>

                            <Row>
                                <Col>
                                    <h3>{row.exercise}</h3>
                                </Col>
                                <Col className="text align right">
                                    <Button variant="danger" size="sm">Delete</Button>
                                </Col>
                            </Row>
        
                            <Table className="exercise-volum-table" striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>Preview</th>
                                        <th>Set</th>
                                        <th>weight(kg)</th>
                                        <th>Reps</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        ( ( row ) => {
                                            let result = []
                                            let i = 0

                                            for ( i; i <= row.sets - 1; i += 1 ) {
                                                result.push(
                                                    <tr>
                                                        <td>
                                                            {i + 1}Set
                                                            &nbsp;/&nbsp;
                                                            {row.weight}Kg
                                                            &nbsp;/&nbsp;
                                                            {row.reps}
                                                            {!row.disableRange ? '~' + row.maxReps : ''}
                                                            Reps
                                                        </td>
                                                        <td>{i + 1}</td>
                                                        <td>{row.weight}</td>
                                                        <td width="100">
                                                            {row.reps}
                                                            {!row.disableRange ? '~' + row.maxReps : ''}
                                                            Reps
                                                        </td>
                                                        <td className="text align center" width="50">
                                                            <Button variant="outline-danger" size="sm">X</Button>
                                                        </td>
                                                    </tr>
                                                )
                                            }

                                            return result
                                        } )( row )
                                    }
                                </tbody>
        
                            </Table>
        
                        </Container>
                    )
                } )}

            </div> //.container
        )
    }

}

export default ExerciseList
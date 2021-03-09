import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDumbbell } from "@fortawesome/free-solid-svg-icons"


interface RoutinePropsInterface {}
interface RoutineStateInterface {}


class Routine extends Component<RoutinePropsInterface, RoutineStateInterface> {

    constructor( props: RoutinePropsInterface ) {
        super( props )

        this.state = {}
    }

    render() {
        return (
            <main className="main">

                <Container>

                    <h2>
                        <FontAwesomeIcon icon={ faDumbbell } />&nbsp;
                        루틴 만들기
                    </h2>

                </Container>

            </main>
        )
    }
}

export default Routine
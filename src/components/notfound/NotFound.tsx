import React, { Component } from 'react'

interface NotFoundPropsInterface {}
interface NotFoundStateInterface {}

class NotFound extends Component<NotFoundPropsInterface,NotFoundStateInterface > {

    constructor( props: NotFoundPropsInterface ) {
        super( props )

        this.state = {}
    }

    render() {
        return (
            <main className="main">
                <div className="container">
                    <h1>Not Found Page..</h1>
                </div>
            </main>
        )
    }
}

export default NotFound
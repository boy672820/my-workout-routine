import React, { Component } from 'react'
import { Link } from 'react-router-dom'


interface UnauthorizedPropsInterface {
    auth: number
}
interface UnauthorizedStateInterface {}


class Unauthorized extends Component<UnauthorizedPropsInterface, UnauthorizedStateInterface> {

    constructor( props: UnauthorizedPropsInterface ) {
        super( props )

        this.state = {}
    }

    render() {
        return (
            <main className="main">
                <div className="container" style={ { textAlign: 'center' } }>
                    <h1>로그인 후 이용하실 수 있습니다.</h1>
                    <h4><Link to="/login">로그인해주세요!</Link></h4>
                </div>
            </main>
        )
    }
}

export default Unauthorized
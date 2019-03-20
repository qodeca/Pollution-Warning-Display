import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Logo} from "../pollution-warning-display/Logo";

class Advertisement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibility: ''
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                visibility: 'show'
            })
        }, 500);

        setTimeout(() => {
            this.setState({
                visibility: ''
            })
        }, 9500);

        setTimeout(() => {
            this.props.history.push('/pollution-warning-display')
        }, 10000);
    }

    render() {
        return(
            <div className={ `advertisement ${this.state.visibility}` }>
                <div className="container text-center">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h3 className="mt-5">Advertisement</h3>
                            <Logo />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Advertisement);

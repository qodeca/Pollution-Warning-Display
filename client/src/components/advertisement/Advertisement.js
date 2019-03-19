import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
        },500);

        setTimeout(() => {
            this.setState({
                visibility: ''
            })
        },9500);

        setTimeout(() => {
            this.props.history.push('/pollution-warning-display')
        }, 10000);
    }

    render() {
        return(
            <div className={ `advertisement ${this.state.visibility}` }>
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 className="mt-5">Advertisement</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Advertisement);

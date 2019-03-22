import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Logo } from '../pollution-warning-display/Logo';
import { mapStateToProps } from '../../functions';

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

        this.timer = setTimeout(() => {
            this.setState({
                visibility: ''
            })
        },this.props.adTime - 500);

        setTimeout(() => {
            this.props.history.push('/pollution-warning-display')
        }, this.props.adTime);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        if(this.props.ads.length === 0)
            return(
                <div>
                    No ads yet!
                </div>
            );

        return(
            <div className={ `advertisement ${this.state.visibility}` }>
                <div className="container text-center">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h3 className="mt-5">{ this.props.ads[this.props.selected].title }</h3>
                            <h4>{ this.props.ads[0].description }</h4>
                            <Logo />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(withRouter(Advertisement));

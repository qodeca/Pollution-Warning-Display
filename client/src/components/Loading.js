import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { pollutionData } from '../actions';

class Loading extends Component {
    componentWillReceiveProps(nextProps) {
        this.props.history.push('/pollution-warning-display')
    }

    render() {
        return(
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { pollutionData })(withRouter(Loading));

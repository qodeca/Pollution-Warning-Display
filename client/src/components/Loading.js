import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { mapStateToProps } from '../functions';

class Loading extends Component {
    componentWillReceiveProps(nextProps) {
        if(nextProps.data !== this.props.data)
            this.props.history.push('/pollution-warning-display')
    }

    render() {
        return(
            <div className="loading text-center">
                <div className="spinner-grow mt-6" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(withRouter(Loading));

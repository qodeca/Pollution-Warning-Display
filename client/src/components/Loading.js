import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Loading extends Component {
    componentWillReceiveProps(nextProps) {
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

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withRouter(Loading));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../functions';

class Advice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animate: '',
            text: this.props.data.indexes[0].advice
        };
    }

    setTimer = nextProps => {
        if (this.timerHandle)
            return;

        this.timerHandle = setTimeout(() => {
            this.setState({
                animate: '',
                text: nextProps.data.indexes[0].advice
            });
            this.timerHandle = 0;
        }, 1000);
    };

    clearTimer = () => {
        if (this.timerHandle) {
            clearTimeout(this.timerHandle);
            this.timerHandle = 0;
            this.setState({
                animate: ''
            });
        }
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props) {
            this.setState({
                animate: 'hide-2'
            });

            this.setTimer(nextProps);
        }
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    render() {
        return(
            <div className="advice">
                <div className="row">
                    <div className="col-12">
                        <h5 className={ `animate-2 ${ this.state.animate }` }>
                            { this.state.text }
                        </h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Advice);

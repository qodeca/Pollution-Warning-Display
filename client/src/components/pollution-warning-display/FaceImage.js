import React, { Component } from 'react';
import { connect } from 'react-redux';

import happyFace from '../../assets/happy-face.png';
import neutralFace from '../../assets/neutral-face.png';
import sadFace from '../../assets/sad-face.png';
import { mapStateToProps } from '../../functions';

const roundTo = require('round-to');

class FaceImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: '',
            level: this.props.data.indexes[0].level,
            value: roundTo(parseFloat(this.props.data.indexes[0].value), 0)
        };
    }

    setTimer = nextProps => {
        if (this.timerHandle)
            return;

        this.timerHandle = setTimeout(() => {
            this.setState({
                animate: '',
                level: nextProps.data.indexes[0].level,
                value: roundTo(parseFloat(nextProps.data.indexes[0].value), 0)
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
        if(nextProps.data.indexes[0].level !== this.state.level) {
            this.setState({
                animate: 'hide'
            });

            this.setTimer(nextProps);
        }
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    render() {
        if(this.state.value <= 50)
            return(
                <div className="face-image">
                    <div className="row">
                        <div className="col-12">
                            <img
                                src={ happyFace }
                                className={ `mx-auto d-block animate ${this.state.animate}` }
                                alt="happy-face"
                            />
                        </div>
                    </div>
                </div>
            );

        if(this.state.value <= 70)
            return(
                <div className="face-image">
                    <div className="row">
                        <div className="col-12">
                            <img
                                src={ neutralFace }
                                className={ `mx-auto d-block animate ${this.state.animate}` }
                                alt="neutral-face"
                            />
                        </div>
                    </div>
                </div>
            );

        return(
            <div className="face-image">
                <div className="row">
                    <div className="col-12">
                        <img
                            src={ sadFace }
                            className={ `mx-auto d-block animate ${this.state.animate}` }
                            alt="sad-face"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(FaceImage);

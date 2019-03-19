import React, { Component } from 'react';
import { connect } from 'react-redux';

class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animate: '',
            text: this.props.data.indexes[0].description
        };
    }

    setTimer = nextProps => {
        if (this.timerHandle)
            return;

        this.timerHandle = setTimeout(() => {
            this.setState({
                animate: '',
                text: nextProps.data.indexes[0].description
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
        if(nextProps.data.indexes[0].description !== this.state.text) {
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
            <div className="desc">
                <div className="row">
                    <div className="col-12">
                        <h4 className={ `animate-2 ${ this.state.animate }` }>
                            { this.state.text }
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Description);

import React, { Component } from 'react';
import pressure from '../../assets/pressure.png';

export default class PressureDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentPressure !== this.props.currentPressure) {
            this.setState({
                animate: 'hide'
            });

            setTimeout(() => {
                this.setState({
                    animate: ''
                });
            },1000);
        }
    }

    render() {
        return(
            <div className="weather-values">
                <img src={ pressure } className="img-fluid" alt="pressure" />
                <h4 className={ `animate ${ this.state.animate }` }>{ this.props.currentPressure }hPa</h4>
            </div>
        );
    }
}

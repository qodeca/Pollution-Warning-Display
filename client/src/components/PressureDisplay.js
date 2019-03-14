import React, { Component } from 'react';
import pressure from '../assets/pressure.png';

export default class PressureDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: 'animate',
            text: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentPressure !== this.props.currentPressure) {
            this.setState({
                animate: 'animate hide'
            });

            setTimeout(() => {
                this.setState({
                    animate: 'animate',
                    text: nextProps.currentPressure + 'hPa'
                })
            },1000)
        }
    }

    render() {
        return(
            <div className="weather-values">
                <img src={ pressure } className="img-fluid" alt="pressure" />
                <h4 className={ this.state.animate }>{ this.state.text }</h4>
            </div>
        )
    }
}

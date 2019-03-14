import React, { Component } from 'react';
import humidity from '../assets/humidity.png';

export default class HumidityDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: 'animate',
            text: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.currentHumidity !== this.props.currentHumidity) {
            this.setState({
                animate: 'animate hide'
            });

            setTimeout(() => {
                this.setState({
                    animate: 'animate',
                    text: nextProps.currentHumidity + '%'
                })
            },1000)
        }
    }

    render() {
        return(
            <div className="weather-values">
                <img src={ humidity } className="img-fluid" alt="humidity" />
                <h4 className={ this.state.animate }>{ this.state.text }</h4>
            </div>
        )
    }
}

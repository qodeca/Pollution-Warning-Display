import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Logo } from './Logo';
import { ClockComponent } from './ClockComponent';
import DateComponent from './DateComponent';
import TemperatureDisplay from './TemperatureDisplay';
import HumidityDisplay from './HumidityDisplay';
import PressureDisplay from './PressureDisplay';
import FaceImage from './FaceImage';
import Advice from './Advice';
import Description from './Description';
import { Footer } from './Footer';
import { mapStateToProps } from '../../functions';

class PollutionWarningDisplay extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visibility: ''
        };
    }

    componentDidMount() {
        setTimeout(() =>{
            this.setState({
                visibility: 'show'
            })
        }, 500);

        this.timer = setTimeout(() => {
            this.setState({
                visibility: ''
            })
        }, this.props.infoTime - 500);

        setTimeout(() => {
            this.props.history.push('/advertisement')
        }, this.props.infoTime);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        return (
            <div className={ `pollution-warning-display ${ this.state.visibility }` }>
                <div className="container text-center">
                    <Logo />

                    <FaceImage />

                    <Description />
                    <Advice />

                    <ClockComponent />
                    <DateComponent />

                    <div className="row">
                        <div className="col-4">
                            <TemperatureDisplay />
                        </div>
                        <div className="col-4">
                            <PressureDisplay />
                        </div>
                        <div className="col-4">
                            <HumidityDisplay />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(PollutionWarningDisplay);

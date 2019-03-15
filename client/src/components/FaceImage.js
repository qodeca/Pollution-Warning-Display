import React, { Component } from 'react';

import happyFace from '../assets/happy-face.png';
import neutralFace from '../assets/neutral-face.png';
import sadFace from '../assets/sad-face.png';

export default class FaceImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: 'animate'
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.pollutionLevel !== this.props.pollutionLevel) {
            this.setState({
                animate: 'mx-auto d-block animate hide'
            });

            setTimeout(() => {
                this.setState({
                    animate: 'mx-auto d-block animate'
                });
            },1000);
        }
    }

    render() {
        if(this.props.pollutionValue <= 50)
            return (
                <div className="face-image">
                    <div className="row">
                        <div className="col-12">
                            <img src={ happyFace } className={ this.state.animate } alt="happy-face" />
                        </div>
                    </div>
                </div>
            );

        if(this.props.pollutionValue <= 70)
            return (
                <div className="face-image">
                    <div className="row">
                        <div className="col-12">
                            <img src={ neutralFace } className={ this.state.animate } alt="neutral-face" />
                        </div>
                    </div>
                </div>
            );

        return (
            <div className="face-image">
                <div className="row">
                    <div className="col-12">
                        <img src={ sadFace } className={ this.state.animate } alt="sad-face" />
                    </div>
                </div>
            </div>
        )
    }
}

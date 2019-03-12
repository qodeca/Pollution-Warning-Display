import React, { Component } from 'react';

import happyFace from '../assets/happy-face.png';
import neutralFace from '../assets/neutral-face.png';
import sadFace from '../assets/sad-face.png';

export default class FaceImage extends Component {
    render() {
        if (this.props.pollutionValue <= 50)
            return (
                <div className="face-image">
                    <div className="row">
                        <div className="col-12">
                            <img src={ happyFace } className="mx-auto d-block" alt="happy-face" />
                        </div>
                    </div>
                </div>
            );

        if (this.props.pollutionValue <= 70)
            return (
                <div className="face-image">
                    <div className="row">
                        <div className="col-12">
                            <img src={ neutralFace } className="mx-auto d-block" alt="neutral-face" />
                        </div>
                    </div>
                </div>
            );

        return (
            <div className="face-image">
                <div className="row">
                    <div className="col-12">
                        <img src={ sadFace } className="mx-auto d-block" alt="sad-face" />
                    </div>
                </div>
            </div>
        )
    }
}

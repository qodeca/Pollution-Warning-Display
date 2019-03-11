import React, { Component } from 'react';

import happyFace from '../assets/happy-face.png';
import neutralFace from '../assets/neutral-face.png';
import sadFace from '../assets/sad-face.png';

class FaceImage extends Component {
    render() {
        if (this.props.pollutionValue <= 50)
            return (
                <div className="face-image">
                    <img src={ happyFace } className="mx-auto d-block" alt="happy-face"/>
                </div>
            );

        if (this.props.pollutionValue <= 70)
            return (
                <div className="face-image">
                    <img src={ neutralFace } className="mx-auto d-block" alt="neutral-face"/>
                </div>
            );

        return (
            <div className="face-image">
                <img src={ sadFace } className="mx-auto d-block" alt="sad-face"/>
            </div>
        )
    }
}

export default FaceImage;

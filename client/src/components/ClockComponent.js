import React, { Component } from 'react';
import Clock from 'react-live-clock';

export default class ClockComponent extends Component {

    render() {
        return(
            <div className="clock text-center">
                <h4><Clock format={'HH:mm'} ticking={true} timezone={'CET'} /></h4>
            </div>
        )
    }
}

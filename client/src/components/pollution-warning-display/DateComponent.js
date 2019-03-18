import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/pl';

moment.locale('pl');

export default class DateComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            day: moment().format('D'),
            month: moment().format('MMMM'),
            year: moment().format('YYYY')
        };
    }

    componentDidMount() {
        this.getCurrentDate = setInterval(() => {
            this.setState({
                day: moment().format('D'),
                month: moment().format('MMMM'),
                year: moment().format('YYYY')
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.getCurrentDate);
    }

    render() {
        return (
            <div className="date">
                <div className="row">
                    <div className="col-12">
                        <h4>{ this.state.day } { this.state.month } { this.state.year }</h4>
                    </div>
                </div>
            </div>
        );
    }
}

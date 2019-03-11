import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/pl';

moment.locale('pl');

class DateComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            day: moment().format('D'),
            month: moment().format('MMMM'),
            year: moment().format('YYYY')
        };
    }
    componentDidMount() {
        setInterval(() => {
            this.setState({
                day: moment().format('D'),
                month: moment().format('MMMM'),
                year: moment().format('YYYY')
            })
        }, 1000)
    }

    render() {
        return (
            <div className="date text-center">
                <h4>
                    {this.state.day} {this.state.month} {this.state.year}
                </h4>
            </div>
        );
    }
}

export default DateComponent;

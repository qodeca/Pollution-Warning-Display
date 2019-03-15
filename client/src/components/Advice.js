import React, { Component } from 'react';

export default class Advice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: 'animate-2',
            text: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.advice !== this.props.advice) {
            this.setState({
                animate: 'animate-2 hide-2'
            });

            setTimeout(() => {
                this.setState({
                    text: nextProps.advice,
                    animate: 'animate-2'
                });
            },1000);
        }
    }

    render() {
        return(
            <div className="advice">
                <div className="row">
                    <div className="col-12">
                        <h5 className={ this.state.animate }>{ this.state.text }</h5>
                    </div>
                </div>
            </div>
        );
    }
}

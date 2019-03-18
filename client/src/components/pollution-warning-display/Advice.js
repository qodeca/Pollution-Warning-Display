import React, { Component } from 'react';

export default class Advice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: '',
            text: this.props.advice
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.advice !== this.props.advice) {
            this.setState({
                animate: 'hide-2'
            });

            setTimeout(() => {
                this.setState({
                    animate: '',
                    text: nextProps.advice
                });
            },1000);
        }
    }

    render() {
        return(
            <div className="advice">
                <div className="row">
                    <div className="col-12">
                        <h5 className={ `animate-2 ${ this.state.animate }` }>
                            { this.state.text }
                        </h5>
                    </div>
                </div>
            </div>
        );
    }
}

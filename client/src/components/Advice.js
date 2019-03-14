import React, { Component } from 'react';

export default class Advice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: 'animate',
            text: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.advice !== this.props.advice) {
            this.setState({
                animate: 'animate hide'
            });

            setTimeout(() => {
                this.setState({
                    text: nextProps.advice,
                    animate: 'animate'
                })
            },1000)
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
        )
    }
}

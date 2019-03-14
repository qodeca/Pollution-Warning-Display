import React, { Component } from 'react';

export default class Description extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: 'animate',
            text: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.desc !== this.props.desc) {
            this.setState({
                animate: 'animate hide'
            });

            setTimeout(() => {
                this.setState({
                    text: nextProps.desc,
                    animate: 'animate'
                })
            },1000)
        }
    }

    render() {
        return(
            <div className="desc">
                <div className="row">
                    <div className="col-12">
                        <h4 className={ this.state.animate }>{ this.state.text }</h4>
                    </div>
                </div>
            </div>
        )
    }
}

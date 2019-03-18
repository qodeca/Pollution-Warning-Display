import React, { Component } from 'react';

export default class Description extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: '',
            text: this.props.desc
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.desc !== this.props.desc) {
            this.setState({
                animate: 'hide-2'
            });

            setTimeout(() => {
                this.setState({
                    animate: '',
                    text: nextProps.desc
                });
            },1000);
        }
    }

    render() {
        return(
            <div className="desc">
                <div className="row">
                    <div className="col-12">
                        <h4 className={ `animate-2 ${ this.state.animate }` }>
                            { this.state.text }
                        </h4>
                    </div>
                </div>
            </div>
        );
    }
}

import React, { Component } from 'react';

class EditAd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            desc: ''
        }
    }

    componentDidMount() {
        this.fetchAd();
    }

    async fetchAd() {
        const response = await fetch(`http://localhost:3001/api/single-ad/${ this.props.match.params.id }`);
        const json = await response.json();
        const data = json.data[0];
        this.setState({
            title: data.title,
            desc: data.desc
        });
    }

    render() {
        return(
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-10">
                            <form method="POST" action={ `http://localhost:3001/submit/edit-ad/${ this.props.match.params.id}/${ this.state.title }/${ this.state.desc }` }>
                                <h3 className="mt-5 mb-4">Edytuj post</h3>
                                <input type="text" className="form-control mb-3" value={ this.state.title } onChange={e => this.setState({title: e.target.value}) } />
                                <textarea rows="5" className="form-control mb-4" value={ this.state.desc } onChange={e => this.setState({desc: e.target.value}) } />
                                <button type="submit" className="btn btn-info"><b>Zapisz</b></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditAd

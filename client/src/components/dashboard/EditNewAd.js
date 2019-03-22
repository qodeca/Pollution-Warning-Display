import React, { Component }  from 'react';
import { Link } from 'react-router-dom';

export default class EditNewAd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            desc: ''
        }
    }

    render() {
        return(
            <div className="row">
                <div className="col-md-12">
                    <Link to="/dashboard"><button type="button" className="btn btn-secondary mb-3"><b>Powrót</b></button></Link>
                    <form method="POST" action={ `http://localhost:3001/submit/add/${ this.state.title}/${ this.state.desc }` }>
                        <div className="form-group">
                            <input type="text" className="form-control"
                                   placeholder="Tytuł ogłoszenia" value={ this.state.title }
                                   onChange={ e => this.setState({ title: e.target.value })} />
                        </div>
                        <div className="form-group">
                        <textarea className="form-control" placeholder="Treść ogłoszenia" value={ this.state.desc }
                                  onChange={ e => this.setState({ desc: e.target.value })}>
                        </textarea>
                        </div>
                        <button type="submit" className="btn btn-primary"><b>Dodaj ogłoszenie</b></button>
                    </form>
                </div>
            </div>
        );
    }
};

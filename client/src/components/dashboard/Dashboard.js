import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

import { selectedAdvertisement, timeToSkipAd, timeToSkipInfo } from '../../actions';
import { mapStateToProps } from '../../functions';
import AdsList from './AdsList';
import { NoAds } from'./NoAds';
import { AddNewAd } from './AddNewAd';
import EditNewAd from './EditNewAd';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ad: this.props.adTime / 1000,
            info: this.props.infoTime / 1000
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.timeToSkipAd(this.state.ad * 1000);
        this.props.timeToSkipInfo(this.state.info * 1000);
    }

    render() {
        return(
            <Router>
                <div className="dashboard">
                    <div className="container">

                        { this.props.ads[0] ? <AdsList /> : <NoAds/> }

                        <Route exact path="/dashboard" component={ AddNewAd } />
                        <Route exact path="/dashboard/add-new-ad" component={ EditNewAd } />

                        <div className="row mt-5">
                            <div className="col-md-auto">
                                <h2 className="mb-3">CZAS TRWANIA EKRANÓW</h2>
                                <form method="POST" action={`http://localhost:3001/submit/set-ad-duration/${this.props.infoTime}/${this.props.adTime}/`}>
                                    <div className="input-group mb-3">
                                        <h4 className="mr-2">Czas trwania ogłoszenia:</h4>
                                        <input type="text"
                                               className="form-control"
                                               value={ this.state.ad }
                                               onChange={ e => this.setState({ ad: e.target.value }) } />
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">sekund</span>
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <h4 className="mr-2">Czas trwania informacji:</h4>
                                        <input type="text"
                                               className="form-control"
                                               value={ this.state.info }
                                               onChange={ e => this.setState({ info: e.target.value }) } />
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">sekund</span>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-info mt-3" onClick={ this.handleClick }><b>Zapisz czasy trwania</b></button>
                                </form>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-auto">
                                <button type="button" className="btn btn-danger mb-5" onClick={ () => this.props.history.push('/advertisement') }><b>Wyloguj</b></button>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default connect(mapStateToProps, { selectedAdvertisement, timeToSkipAd, timeToSkipInfo })(withRouter(Dashboard));

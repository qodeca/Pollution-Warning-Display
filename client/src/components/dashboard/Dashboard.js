import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

import { selectedAdvertisement, timeToSkipAd, timeToSkipInfo } from '../../actions';
import { mapStateToProps }                                     from '../../functions';
import AdsList                                                 from './AdsList';
import { NoAds }                                               from'./NoAds';
import { AddNewAd }                                            from './AddNewAd';
import EditNewAd                                               from './EditNewAd';

class Dashboard extends Component {
    render() {
        if(!this.props.ads[0])
            return(
                <Router>
                    <div className="dashboard">
                        <div className="container">

                            <NoAds/>

                            <Route exact path="/dashboard" component={ AddNewAd } />
                            <Route exact path="/dashboard/add-new-ad" component={ EditNewAd } />

                            <div className="row mt-5">
                                <div className="col-md-auto">
                                    <h2 className="mb-3">CZAS TRWANIA EKRANÓW</h2>
                                    <form>
                                        <div className="input-group mb-3">
                                            <h4 className="mr-2">Czas trwania ogłoszenia:</h4>
                                            <input type="text"
                                                   className="form-control"
                                                   value={ this.props.adTime }
                                                   onChange={ e => this.props.timeToSkipAd(e.target.value) } />
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">milisekund</span>
                                            </div>
                                            <h4 className="ml-2">= { this.props.adTime / 1000 } sekund</h4>
                                        </div>
                                        <div className="input-group">
                                            <h4 className="mr-2">Czas trwania informacji:</h4>
                                            <input type="text"
                                                   className="form-control"
                                                   value={ this.props.infoTime }
                                                   onChange={ e => this.props.timeToSkipInfo(e.target.value) } />
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">milisekund</span>
                                            </div>
                                            <h4 className="ml-2">= { this.props.infoTime / 1000 } sekund</h4>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="row mt-5">
                                <div className="col-md-auto">
                                    <form>
                                        <button type="button" className="btn btn-danger mb-5" onClick={ () => this.props.history.push('/advertisement') }><b>Wyloguj</b></button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </Router>
            );

        return(
            <Router>
                <div className="dashboard">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 mt-5 mb-3">
                                <h2 className="mb-3">OGŁOSZENIA</h2>
                                <div className="alert alert-primary" role="alert">
                                    <h5 className="mt-2 mb-2">Aktualnie wybrane ogłoszenie: { this.props.selected + 1 } - "{this.props.ads[this.props.selected].title}"</h5>
                                </div>
                            </div>
                        </div>

                        <h5 className="mb-3">Lista wszystkich ogłoszeń: </h5>

                        <AdsList />

                        <Route exact path="/dashboard" component={ AddNewAd } />
                        <Route exact path="/dashboard/add-new-ad" component={ EditNewAd } />

                        <div className="row mt-5">
                            <div className="col-md-auto">
                                <h2 className="mb-3">CZAS TRWANIA EKRANÓW</h2>
                                <form>
                                    <div className="input-group mb-3">
                                        <h4 className="mr-2">Czas trwania ogłoszenia:</h4>
                                        <input type="text"
                                               className="form-control"
                                               value={ this.props.adTime }
                                               onChange={ e => this.props.timeToSkipAd(e.target.value) } />
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">milisekund</span>
                                        </div>
                                        <h4 className="ml-2">= { this.props.adTime / 1000 } sekund</h4>
                                    </div>
                                    <div className="input-group">
                                        <h4 className="mr-2">Czas trwania informacji:</h4>
                                        <input type="text"
                                               className="form-control"
                                               value={ this.props.infoTime }
                                               onChange={ e => this.props.timeToSkipInfo(e.target.value) } />
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">milisekund</span>
                                        </div>
                                        <h4 className="ml-2">= { this.props.infoTime / 1000 } sekund</h4>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-md-auto">
                                <form>
                                    <button type="button" className="btn btn-danger mb-5" onClick={ () => this.props.history.push('/advertisement') }><b>Wyloguj</b></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default connect(mapStateToProps, { selectedAdvertisement, timeToSkipAd, timeToSkipInfo })(withRouter(Dashboard));

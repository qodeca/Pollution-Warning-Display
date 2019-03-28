import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { selectedAdvertisement } from '../../actions';
import { mapStateToProps }       from '../../functions';
import SelectedAd                from './SelectedAd';
import {Link}                    from 'react-router-dom';

class AdsList extends Component {
    handleClick(ad) {
        this.props.history.push(`/dashboard/edit-ad/${ad._id}`)
    }
    render() {
        return (
            <Fragment>
                <SelectedAd />
                <h5 className="mb-3">Lista wszystkich ogłoszeń: </h5>
                { this.props.ads.map((ad, index) => {
                    return (
                        <div className="row" key={ad._id}>
                            <div className="col-md-12">
                                <div className="alert alert-secondary" role="alert">
                                    <div className="row justify-content-md-start">
                                        <div className="col-md-1">
                                            <h5 className="mt-2">{index + 1}</h5>
                                        </div>

                                        <div className="col-md-7">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h5 className="mt-2">{ad.title}</h5>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <h6 className="mb-2 text-justify">{ad.desc}</h6>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-auto">
                                            <button type="button" className="btn btn-success"
                                                    onClick={() => this.props.selectedAdvertisement(index)}>
                                                <b>Wybierz</b>
                                            </button>
                                        </div>

                                        <div className="col-md-auto">
                                            <Link to={`/dashboard/edit-ad/${ ad._id }`} onClick={ this.handleClick }><button type="button" className="btn btn-warning"><b>Edytuj</b></button></Link>
                                        </div>

                                        <div className="col-md-auto">
                                            <form method="POST" className="hide-input" action={`http://localhost:3001/submit/delete/${ad._id}`}>
                                                <input type="text" defaultValue={ad._id}/>
                                                <button type="submit" className="btn btn-danger"><b>Usuń</b></button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Fragment>
        );
    }
}

export default connect(mapStateToProps, { selectedAdvertisement })(withRouter(AdsList));

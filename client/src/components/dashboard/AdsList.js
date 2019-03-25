import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { selectedAdvertisement } from '../../actions';
import { mapStateToProps }       from '../../functions';
import SelectedAd                from './SelectedAd';

class AdsList extends Component {
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
                                                    <h6 className="mb-2 text-justify">{ad.description}</h6>
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
                                            <button type="button" className="btn btn-warning"><b>Edytuj</b></button>
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

export default connect(mapStateToProps, { selectedAdvertisement })(AdsList);

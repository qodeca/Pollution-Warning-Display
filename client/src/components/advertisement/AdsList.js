import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectedAdvertisement } from '../../actions';
import { mapStateToProps } from "../../functions";

class AdsList extends Component {
    render() {
        return this.props.ads.map((ad, index) => {
            return(
                <div className="row" key={ad._id}>
                    <div className="col-md-12">
                        <div className="alert alert-secondary" role="alert">
                            <div className="row justify-content-md-start">
                                <div className="col-md-1">
                                    <h5 className="mt-2">{ index }</h5>
                                </div>

                                <div className="col-md-7">
                                    <h5 className="mt-2">{ ad.title }</h5>
                                </div>

                                <div className="col-md-auto">
                                    <button type="button" className="btn btn-success" onClick={ () => this.props.selectedAdvertisement(index) }>
                                        <b>Wybierz</b>
                                    </button>
                                </div>

                                <div className="col-md-auto">
                                    <button type="button" className="btn btn-warning"><b>Edytuj</b></button>
                                </div>

                                <div className="col-md-auto">
                                    <button type="button" className="btn btn-danger"><b>Usuń</b></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }
}

export default connect(mapStateToProps, { selectedAdvertisement })(AdsList);

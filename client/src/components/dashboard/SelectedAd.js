import React, { Component } from 'react';
import { connect } from 'react-redux';

class SelectedAd extends Component {
    render() {
        return(
            <div className="row">
                <div className="col-md-12 mt-5 mb-3">
                    <h2 className="mb-3">OGŁOSZENIA</h2>
                    <div className="alert alert-primary" role="alert">
                        <h5 className="mt-2 mb-2">Aktualnie wybrane ogłoszenie: { this.props.selected + 1 } - "{this.props.ads[this.props.selected].title}"</h5>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(SelectedAd);

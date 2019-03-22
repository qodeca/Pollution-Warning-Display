import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { selectedAdvertisement } from '../../actions';
import { mapStateToProps }       from '../../functions';

class AdsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

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
                                    <button type="button" className="btn btn-danger" onClick={ this.toggle }><b>Usuń</b></button>
                                </div>

                                <Modal isOpen={ this.state.modal } toggle={ this.toggle } className="delete-modal">
                                    <ModalHeader toggle={ this.toggle }>Uwaga!!!</ModalHeader>
                                    <ModalBody>
                                        <h5>Czy napewno chcesz usunąć wybrany post?</h5>
                                        <br />
                                        <h3>ID: { index }</h3>
                                        <h5>Tytuł: { ad.title }</h5>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={ this.toggle }>Nie, nie chcę usuwać postu</Button>
                                        <form>
                                            <input defaultValue={ ad._id } name="id" />
                                            <button type="submit" className="btn btn-danger" onClick={ this.toggle }>Tak, usuń post</button>
                                        </form>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    }
}

export default connect(mapStateToProps, { selectedAdvertisement })(AdsList);

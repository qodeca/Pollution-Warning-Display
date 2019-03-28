import React    from 'react';
import { Link } from 'react-router-dom';

export const AddNewAd = () => {
    return(
        <div className="row">
            <div className="col-md-auto">
                <Link to="/dashboard/add-new-ad"><button type="button" className="btn btn-info"><b>Dodaj nowe</b></button></Link>
            </div>
        </div>
    );
};

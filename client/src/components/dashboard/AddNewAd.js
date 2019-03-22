import React    from 'react';
import { Link } from 'react-router-dom';

export const AddNewAd = () => {
    return(
        <div className="row">
            <div className="col-md-auto">
                <form>
                    <Link to="/dashboard/add-new-ad"><button type="button" className="btn btn-info"><b>Dodaj nowe</b></button></Link>
                </form>
            </div>
        </div>
    );
};

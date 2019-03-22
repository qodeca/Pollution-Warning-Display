import React from 'react';

export const NoAds = () => {
    return(
        <div className="row">
            <div className="col-md-12 mt-5 mb-3">
                <h2 className="mb-3">OGŁOSZENIA</h2>
                <div className="alert alert-primary" role="alert">
                    <h5 className="mt-2 mb-2">Brak dodanych ogłoszeń</h5>
                </div>
            </div>
        </div>
    );
};

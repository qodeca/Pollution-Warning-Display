import React from 'react';
import Clock from 'react-live-clock';

export const ClockComponent = () => {
    return(
        <div className="clock">
            <div className="row">
                <div className="col-12">
                    <h4><Clock format={ 'HH:mm' } ticking={ true } timezone={ 'CET' } /></h4>
                </div>
            </div>
        </div>
    );
};

import React from 'react';

export const Advice = props => {
    return(
        <div className="advice">
            <div className="row">
                <div className="col-12">
                    <h5>{ props.advice }</h5>
                </div>
            </div>
        </div>
    );
};

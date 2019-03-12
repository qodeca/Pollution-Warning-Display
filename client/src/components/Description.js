import React from 'react';

export const Description = props => {
    return(
        <div className="desc">
            <div className="row">
                <div className="col-12">
                    <h4>{ props.desc}</h4>
                </div>
            </div>
        </div>
    );
};

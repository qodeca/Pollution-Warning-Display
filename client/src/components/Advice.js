import React from 'react';

const Advice = (props) => {
    return(
        <div className="advice text-center">
            <h5>{ props.advice}</h5>
        </div>
    );
};

export default Advice;

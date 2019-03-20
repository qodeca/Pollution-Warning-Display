import React from 'react';

import LogoSrc from '../../assets/logo-qodeca.png';

export const Logo = () => {
    return(
        <div className="logo">
            <img
                className="img-fluid"
                src={ LogoSrc }
                alt="logo"
            />
        </div>
    );
};

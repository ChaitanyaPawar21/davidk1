import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium', imageUrl = 'https://ik.imagekit.io/ht1e6kqd8/Untitled%20design%20(2).png' }) => {
    return (
        <div className={`logo-container logo-${size}`}>
            <img src={imageUrl} alt="Brand Logo" className="logo-image" />
        </div>
    );
};

export default Logo;

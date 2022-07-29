import React from 'react';
import './load.css';

export const LoadScreen = ({visible}:{visible:boolean}) => {
    return (
        <div className={visible ? "preloader" : ""} >
            <div className="loader"></div>
        </div>
    )
}

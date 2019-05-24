import React from 'react';
import './styles.css'
import LoadingIcon from '../../Assets/assets/images/loading.svg';

const Loading = () => {
    return (
        <div className="Spinner">
            <img src={LoadingIcon} alt=""/>
        </div>
    );
}

export default Loading;



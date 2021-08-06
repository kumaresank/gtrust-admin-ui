import React from 'react';

const Delete = ({ text, onDeleteSelected }) => {
    return (
        <span className='action-btn' onClick={onDeleteSelected}>
            {text}
        </span>
    );
};

export default Delete;

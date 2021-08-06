import React from 'react';
import Delete from './Detele';

const Pagination = ({ setPage, onDeleteSelected, page, pageCount }) => {
    return (
        <div className='paginationContainer'>
            <Delete
                text='Delete Selected'
                onDeleteSelected={onDeleteSelected}
            />
            <button
                className={`${page === 1 && 'disabled'}`}
                onClick={() => setPage(1)}>
                {'<<'}
            </button>
            <button
                className={`${page === 1 && 'disabled'}`}
                onClick={() => setPage(page - 1)}>
                {'<'}
            </button>
            {[...Array(pageCount).keys()].map((index) => (
                <button
                    key={index}
                    className={`${index + 1 === page && 'active'}`}
                    onClick={() => setPage(index + 1)}>
                    {index + 1}
                </button>
            ))}
            <button
                className={`${page === pageCount && 'disabled'}`}
                onClick={() => setPage(page + 1)}>
                {'>'}
            </button>
            <button
                className={`${page === pageCount && 'disabled'}`}
                onClick={() => setPage(pageCount)}>
                {'>>'}
            </button>
        </div>
    );
};

export default Pagination;

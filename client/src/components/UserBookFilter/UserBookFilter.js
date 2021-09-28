import React, { useState } from 'react';

const  BooksFilter = (props) => {
    const [buttons, setButtons] = useState([
            {name: 'all', label: 'All'},
            {name: 'like', label: 'Liked'}
        ]);
    
    
        const allButtons = buttons.map(({name, label}) => {
            const active = props.filter === name;
            const newClass = active ? 'btn-info' : 'btn-outline-danger';
            return (
                <button
                 key={name}
                  type="button" 
                  className={`btn ${newClass}`}
                  onClick={() => props.onFilterSelect(name)}>{label}</button>
            )
        });
       return (
        <div className="btn-group">
            {allButtons}
        </div>
    ) 
    
}

export default BooksFilter;


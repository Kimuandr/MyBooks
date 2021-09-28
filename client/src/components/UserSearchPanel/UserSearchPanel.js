import React, { useState } from 'react';
import './search-panel.css';

const SearchPanel = (props) => {

const [term, setTerm] = useState('');

    const onUpdateSearch = (e) => {
        const searchTerm = e.target.value;
        setTerm(searchTerm);
        props.onUpdateSearch(searchTerm);
    }
        return (
            <input className="form-control search-input"
                type="text"
                placeholder="Search"
                onChange={onUpdateSearch}/> 
    )
}

export default SearchPanel;
    


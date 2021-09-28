import React, { useState } from 'react';
import { StyledSearchInput } from "../Styles";;

const SearchPanel = (props) => {

const [term, setTerm] = useState('');

    const onUpdateSearch = (e) => {
        const searchTerm = e.target.value;
        setTerm(searchTerm);
        props.onUpdateSearch(searchTerm);
    }
        return (
            <StyledSearchInput type="text" placeholder="Book Search" onChange={onUpdateSearch}/> 
    )
}

export default SearchPanel;
    


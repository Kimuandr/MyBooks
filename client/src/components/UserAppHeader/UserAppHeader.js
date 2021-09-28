import React from 'react';
import { StyledUserTopHeader } from '../Styles';



const AppHeader = ({liked, allBooks}) => {
    return (
        <StyledUserTopHeader colored>
            <h2>{allBooks} book added, {liked} likes were given</h2>
        </StyledUserTopHeader>
    )
}

export default AppHeader;
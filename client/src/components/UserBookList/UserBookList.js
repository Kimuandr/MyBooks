import React from 'react';
import BooksListItem from '../UserBookListItem/UserBookListItem';
import './UserBookList.css';
import { ListGroup } from 'reactstrap';

const BooksList = ({books, onToggleImportant, onToggleLiked, onDelete}) => {
    const elements = books.map(book => {
        const {id, ...bookProps} = book;
return (
        <li key={id} className="list-group-item">
        <BooksListItem {...bookProps} 
        onDelete={() => onDelete(id)}
        onToggleImportant={() => onToggleImportant(id)}
        onToggleLiked={() => onToggleLiked(id)}
        />
    </li>
)
    });
    return (
        <ListGroup className="app-list">
            {elements}
        </ListGroup>
    )
}

export default BooksList;
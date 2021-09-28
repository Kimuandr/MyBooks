import React, { useState } from 'react';
import './UserBookAddForm.css';


const BookAddForm = (props) => {
  
    const [textAuth, setTextAuth] = useState('');
    const [textTitle, setTextTitle] = useState('');
    const [textYear, setTextYear] = useState('');
    const [textPages, setTextPages] = useState('');
        
    const onValueChangeAuthor =(e) => {
        setTextAuth(e.target.value)
    }

    const onValueChangeTitle = (e) => {
        setTextTitle(e.target.value);
    }

    const onValueChangeYear = (e) => {
        setTextYear(e.target.value);
    }

    const onValueChangePages = (e) => {
        setTextPages(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        props.addBook(textAuth, textTitle, textYear, textPages);
        setTextAuth('');
        setTextTitle('');
        setTextYear('');
        setTextPages('');
    }

     
        return (
        <form className="bottom-panel d-flex" onSubmit={onSubmit}>
            <input className="form-control new-post-label"
             type="text" 
             placeholder="Author"
            onChange={onValueChangeAuthor}
            value={textAuth}></input>
            <input className="form-control new-post-label" 
            type="text" 
            placeholder="Title"
            onChange={onValueChangeTitle}
            value={textTitle}></input>
            <input className="form-control new-post-label" 
            type="text" 
            placeholder="Year"
            onChange={onValueChangeYear}
            value={textYear}></input>
            <input className="form-control new-post-label" 
            type="text" 
            placeholder="Pages"
            onChange={onValueChangePages}
            value={textPages}></input>
            <button type="submit" 
                className="btn btn-outline-danger">
               Add book data
            </button>
        </form>
    )    
}
 
 
export default BookAddForm;


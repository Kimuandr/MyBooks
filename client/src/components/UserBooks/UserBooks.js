import React, {useState} from 'react';
import AppHeader from '../UserAppHeader/UserAppHeader';
import SearchPanel from '../UserSearchPanel/UserSearchPanel';
import BooksFilter from '../UserBookFilter/UserBookFilter';
import BooksList from '../UserBookList/UserBookList';
import BookAddForm from '../UserBookAddForm/UserBookAddForm';

import './UserBooks.css';

const UserBooks = ({booksList}) => {
  
const [books, setBooks] = useState(booksList);
const [term, setTerm] = useState('');
const [filter, setFilter] = useState('All');



const liked = books.filter(book => book.like).length;
const allBooks = books.length;
let maxId = books.length + 1;

    const addBook = (author, title, year, pages) => {
          const newBook = {
            author,
            title,
            year, 
            pages,
            important: false,
            id: maxId++
          }
          const newArrBooks = [newBook, ...books];
          setBooks(newArrBooks); 
    }

 
    const deleteBook = (id) => {
            const index = books.findIndex(book => book.id === id);
            const newArr = [...books.slice(0, index), ...books.slice(index + 1)];
            setBooks(newArr);      
        }

    const onToggleImportant = (id) => {
        const index = books.findIndex(elem => elem.id === id);
        const old = books[index];
        const newImportant = {...old, important: !old.important};
        const newArr = [...books.slice(0, index), newImportant, ...books.slice(index + 1)];
        setBooks(newArr);
    }

    const onToggleLiked = (id) => {
          const index = books.findIndex(elem => elem.id === id);
          const old = books[index];
          const newLike = {...old, like: !old.like};
          const newArr = [...books.slice(0, index), newLike, ...books.slice(index + 1)];
          setBooks(newArr);
    }

    const searchBook = (items, term) => {
      if (term.length === 0) {
        return items;
      }
      return items.filter((item) => {
        return (item.author.indexOf(term) > -1)
      })
    }

    const filterBook = (items, filter) => {
      if (filter === 'like') {
        return items.filter(item => item.like)
      } else {
        return items;
      }
    }

    const visibleBooks = filterBook(searchBook(books, term), filter); 

    const onUpdateSearch = (term) => {
      setTerm(term)
    }

    const onFilterSelect = (filter) => {
      setFilter(filter);
    }
    
    return (
      <div>
        <div className='container'>
          <AppHeader liked={liked} allBooks={allBooks}/>
            <div className="search-panel d-flex">
              <SearchPanel onUpdateSearch={onUpdateSearch}/>
              <BooksFilter filter={filter} onFilterSelect={onFilterSelect}/>
            </div>
            <BookAddForm addBook={addBook}/> 
              {books.length !== 0
              ? <BooksList books={visibleBooks} 
              onToggleImportant={onToggleImportant}
              onToggleLiked={onToggleLiked}
              onDelete={deleteBook} />
              : <div>Books not found!</div>} 
           </div>
        </div>
      
    )
  }
  export default UserBooks; 

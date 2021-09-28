import React, {useState} from 'react';
import './UserBookListItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar, faTrash } from '@fortawesome/free-solid-svg-icons';

const BooksListItem = ({author, title, year, pages, imageLink, onToggleImportant, onToggleLiked, onDelete, important, like}) => {
    
    const [selectedFile, setSelectedFile] = useState(null);
    const [formStyle, setFormStyle] = useState('block');

        let classNames = 'app-list-item d-flex justify-content-between';

        if (important) {
            classNames += ' important';
        }

        if (like) {
            classNames += ' like';
        }

        const handleChange = (e) => {
            setSelectedFile(URL.createObjectURL(e.target.files[0]))
            setFormStyle('none')
        }

        return (
        <li className={classNames}>
            {imageLink ? 
            <span>
                <img style={{width: '50px'}} src={`./${imageLink}`} alt={title}/>
            </span>
            : <span>
                <form style={{display: `${formStyle}`}}>
                    <input type='file' className="form-control new-post-label" onChange={handleChange}></input>
                </form>
                {selectedFile ? <img style={{width: '50px'}} src={selectedFile} alt={title} /> : null}
            </span>
        }
            
            <span className="app-list-item-label" onClick={onToggleLiked}>
                {author} {title}, year: {year},  pages: {pages}
            </span>
             <div className="d-flex justify-content-center">
                <button type="button" className="btn-star btn-sm">
                    <FontAwesomeIcon icon={faStar} onClick={onToggleImportant} />
                </button>
                <button onClick={onDelete} type="button" className="btn-trash btn-sm">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
                <FontAwesomeIcon icon={faHeart} />
            </div>
         </li> 
        )
}

export default BooksListItem;

import React, {useState} from 'react';
import {Card, CardTitle, CardImg, CardBody, Button, Modal} from 'reactstrap';


const BookCard = ({picture, title, pages, author, language, year, link}) => {
const [modal, setModal] = useState(false);
const toggle = () => setModal(!modal);
    return (
        <Card style={{width: '180px'}} className='m-auto'>
            <CardImg top style={{width: '100%'}} src={picture} alt={title} />
            <CardBody>
                <CardTitle className='card-title'>{title}</CardTitle>
                <div className='d-flex justify-content-between'>
                    <Button onClick={toggle}>Info</Button>
                    <Button onClick={toggle}>Add</Button>
                </div>
            </CardBody>
            <Modal isOpen={modal} toggle={toggle}>
                <div className='modal-header d-flex justify-content-between'>
                    <h5 className='modal-title text-center' id='modalLabel'>{title}</h5>
                    <Button type='button' onClick={toggle} className='close' aria-label='Close'>
                        <span aria-hidden={true}>X</span>
                    </Button>
                </div>
                <div className='modal-body'>
                    <div className='d-flex justify-content-between ml-3'>
                        <img src={picture} alt={title} />
                    </div>
                    <p>Author: {author}</p>
                    <p>Language: {language}</p>
                    <p>Page Count: {pages}</p>
                    <p>Year: {year}</p>
                </div>
                <div className='modal-footer'>
                    <a 
                    href={link} 
                    className='wiki-link' 
                    color='danger' 
                    type='buttun' 
                    target='_blank'
                    rel="noreferrer">
                        Link
                    </a>
                </div>
            </Modal>
        </Card>
    )
}   
export default BookCard;
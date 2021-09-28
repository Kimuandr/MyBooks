import React from 'react';
import BookCard from './BookCards/BookCard';
import { Spinner } from 'reactstrap';

import {StyledBookCardArea} from "../Styles";

const HandleCards = ({cards, loading}) => {

    const items = cards.map(card => {
      let picture = '';
      if (card.imageLink) {
        picture = `/${card.imageLink}`;
      }
      return (
          <div className='col-lg-3 mt-3'  key={card.id}>
          <BookCard 
          picture={picture} 
          title={card.title}
          pages={card.pages}
          author={card.author}
          language={card.language}
          year={card.year}
          link={card.link}
          />
        </div>
      )
    })

    if (loading) {
      return (
        <div className='d-flex justify-content-center mt-3'>
          <Spinner color="danger" style={{width: '3rem', height: '3rem'}} />
        </div>
      )
    } else {
      return (
        <StyledBookCardArea>
          <div className='row'>{items}</div>
        </StyledBookCardArea>
      )
    }
  }

  export default HandleCards;
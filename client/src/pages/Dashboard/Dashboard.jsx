import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import axios from 'axios';

import { logoutUser } from '../../redux/Auth/actions/userActions';

import { StyledTitle, AvatarForDashboard, StyledButton, ButtonGroup, SearchArea } from "../../components/Styles";
import "./Dashboard.css";

import SearchPanel from '../../components/SearchPanel/SearchPanel';

import Logo from "../../assets/logo.png";
import HandleCards from '../../components/Books/HandleCards';
import UserBooks from "../../components/UserBooks/UserBooks";


const Dashboard = ({logoutUser, user}) => {
    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const [cards, setCards] = useState([]);
    const [term, setTerm] = useState('');
    

    const [myBooks, setMyBooks] = useState(false);
    const [btnTitle, setBtnTitle] = useState("My books");

   

      
    const handleSubmit = () => {
        setLoading(true);
           axios.get(`http://localhost:8080/api/books`)
          .then(res => {
               console.log(res.data);
            if (res.data.length < 1) {
              console.error(`Sorry, I can't find anything!`);
            } else {
             if (res.data.length > 0) {
              setLoading(false);
              setCards(res.data);
            }
          }
          console.log(cards);
          })
          .catch(err => {
            console.log(err);
            setLoading(true);
          })
        }

        useEffect(handleSubmit, []);

         const searchBook = (items, term) => {
          if (term.length === 0) {
            return items;
          }
          return items.filter((item) => {
            const lowTitle = item.title.toLowerCase()
            return (lowTitle.indexOf(term) > -1)
          })
        }
        
        const visibleBooks = searchBook(cards, term);
      
        const onUpdateSearch = (term) => {
          setTerm(term)
        }

       
    return (
         <div>
            <div className="avatar">
                <div>
                    <AvatarForDashboard logo={Logo}/>
                    <StyledTitle size={30}>Hi, {user.name}!</StyledTitle>
                </div>
                <ButtonGroup>
                    <StyledButton to="#" onClick={() => logoutUser(history)}>LogOut</StyledButton>
                    <StyledButton type='button' onClick={e => {
                      e.preventDefault();
                      setMyBooks(!myBooks);
                      if (!myBooks) {
                        setBtnTitle("All books");
                        console.log(btnTitle);
                      } else {
                        setBtnTitle("My books");
                        console.log(btnTitle);
                      };
                   }}>{btnTitle}</StyledButton>
                </ButtonGroup>
               
            </div>
            {!myBooks ? <div>
             <SearchArea>
                <SearchPanel onUpdateSearch={onUpdateSearch}/>
            </SearchArea>
            {
                cards.length !== 0
                ? <HandleCards cards={visibleBooks} loading={loading}/>
                : <h3 style={{color: "red"}}>"Can't find any books!"</h3>
                }
            </div> :
            <UserBooks booksList={cards}/>
              }
        </div>
     )
}

const mapStateToProps = ({session}) => ({
    user: session.user
})

export default connect(mapStateToProps, {logoutUser})(Dashboard);
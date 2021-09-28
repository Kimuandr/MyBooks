import React from 'react';

import Logo from "../../assets/logo.png";

import { StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup } from "../../components/Styles";

const Home = () => {
    return (
        <div>
            <div>
                <Avatar logo={Logo}/>
            </div>
            <StyledTitle size={60}>
                Welcome to BooksSharingApp!
            </StyledTitle>
            <StyledSubTitle size={25}>
                Register to create, share and read books for free...
            </StyledSubTitle>
            <ButtonGroup>
                <StyledButton to="/login">LogIn</StyledButton>
                <StyledButton to="/signup">SignUp</StyledButton>
            </ButtonGroup>
        </div>
    )
}

export default Home;
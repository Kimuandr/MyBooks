import React from 'react';
import { useParams } from 'react-router';

import { StyledTitle, Avatar, StyledButton, ButtonGroup, StyledFormArea, ExtraText, colors } from "../../components/Styles";

import Logo from "../../assets/logo.png";

const EmailActivation = () => {
    const {userEmail} = useParams();
    return (
        <div>
            <div className="avatar">
                <Avatar logo={Logo}/>
            </div>
            <StyledFormArea bg={colors.dark3}>
                <StyledTitle size={60}>
                    Confirm your account
                </StyledTitle>
                <ExtraText color={colors.light1}>
                    An account confirmation link was sent to <strong>{userEmail}</strong>!
                </ExtraText>
                <ButtonGroup>
                    <StyledButton to={`/login/${userEmail}`}>Continue</StyledButton>
                </ButtonGroup>
            </StyledFormArea>
        </div>
    )
}

export default EmailActivation;
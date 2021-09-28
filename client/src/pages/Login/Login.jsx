import React from 'react';
import {Formik, Form} from "formik";
import {FiMail, FiLock} from "react-icons/fi";
import * as Yup from "yup";
import Loader from "react-loader-spinner";

import { TextInput } from '../../components/FormLibrary/FormLibrary';

import {StyledFormArea, StyledFormButton, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink } from "./../../components/Styles";

import Logo from "./../../assets/logo.png";

import {connect} from "react-redux";
import { loginUser } from '../../redux/Auth/actions/userActions';
import { useHistory, useParams } from 'react-router';

const Login = ({loginUser}) => {

    const history = useHistory();
    const {userEmail} = useParams();
    
    return (
        <div>
            <StyledFormArea>
                <Avatar logo={Logo}/>
                <StyledTitle color={colors.theme} size={30}>
                    LogIn
                    </StyledTitle>
                    <Formik 
                        initialValues={{
                            email: userEmail,
                            password: ""
                    }} 
                    validationSchema={
                        Yup.object({
                            email: Yup.string().email("Invalid email adress").required("Required"),
                            password: Yup.string().min(6, "Password is too short")
                            .max(15, "Password is too long").required("Required"),
                        })
                    }
                    onSubmit={(values, {setSubmitting, setFieldError}) => {
                        loginUser(values, history, setFieldError, setSubmitting);
                    }}
                >
                        {({isSubmitting}) => (
                            <Form>
                                <TextInput name="email" type="text" label="Email Adress" placeholder="book@example.com" icon={<FiMail />}/>
                                <TextInput name="password" type="password" label="Password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" icon={<FiLock />}/>
                                <ButtonGroup>
                                {!isSubmitting && <StyledFormButton type="submit">LogIn</StyledFormButton>}
                                {isSubmitting && (
                                    <Loader type="BallTriangle" color={colors.theme} height={50} width={50}/>
                                )}
                                </ButtonGroup>
                            </Form>
                        )}
                    </Formik>
                    <ExtraText>
                        <TextLink to="/signup">SignUp</TextLink>, if you're new here!
                    </ExtraText>
            </StyledFormArea>
            
        </div>
    );
}

export default connect(null, {loginUser})(Login);
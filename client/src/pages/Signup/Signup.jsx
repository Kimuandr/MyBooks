import React from 'react';
import {Formik, Form} from "formik";
import {FiMail, FiLock} from "react-icons/fi";
import {BsPerson} from "react-icons/bs";
import * as Yup from "yup";
import Loader from "react-loader-spinner";

import { TextInput } from '../../components/FormLibrary/FormLibrary';

import {StyledFormArea, StyledFormButton, Avatar, StyledTitle, colors, ButtonGroup, ExtraText, TextLink } from "../../components/Styles";

import Logo from "./../../assets/logo.png";

import {connect} from "react-redux";
import { registerUser } from '../../redux/Auth/actions/userActions';
import { useHistory } from 'react-router';

const Signup = ({registerUser}) => {

    const history = useHistory();
    
    return (
        <div>
            <StyledFormArea>
                <Avatar logo={Logo}/>
                <StyledTitle color={colors.theme} size={30}>
                SignUp
                    </StyledTitle>
                    <Formik 
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",
                            repeatPassword: ""
                    }} 
                    validationSchema={
                        Yup.object({
                            name: Yup.string().required("Required"),
                            email: Yup.string().email("Invalid email adress").required("Required"),
                            password: Yup.string().min(6, "Password is too short")
                            .max(15, "Password is too long").required("Required"),
                            repeatPassword: Yup.string().required("Required").oneOf([Yup.ref("password")], "Passwords don't match!")
                        })
                    }
                    onSubmit={(values, {setSubmitting, setFieldError}) => {
                        registerUser(values, history, setFieldError, setSubmitting)
                    }}
                >
                        {({isSubmitting}) => (
                            <Form>
                                <TextInput name="name" type="text" label="Name" placeholder="Yauhen" icon={<BsPerson />}/>
                                <TextInput name="email" type="text" label="Email Adress" placeholder="book@example.com" icon={<FiMail />}/>
                                <TextInput name="password" type="password" label="Password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" icon={<FiLock />}/>
                                <TextInput name="repeatPassword" type="password" label="Repeat Password" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" icon={<FiLock />}/>
                                <ButtonGroup>
                                {!isSubmitting && <StyledFormButton type="submit">SignUp</StyledFormButton>}
                                {isSubmitting && (
                                    <Loader type="BallTriangle" color={colors.theme} height={50} width={50}/>
                                )}
                                </ButtonGroup>
                            </Form>
                        )}
                    </Formik>
                    <ExtraText>
                        If you have an account, just <TextLink to="/login">LogIn</TextLink>
                    </ExtraText>
            </StyledFormArea>
            
        </div>
    );
}

export default connect(null, {registerUser})(Signup);
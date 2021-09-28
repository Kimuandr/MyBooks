import React, {useState} from "react";
import {useField} from "formik";

import { StyledTextInput, StyledLabel, StyledIcon, StyledErrorMessage } from "../Styles";
import "./FormLibrary.css";
import {FiEye, FiEyeOff} from "react-icons/fi";

export const TextInput = ({icon, ...props}) => {
    const [field, meta] = useField(props);
    const [show, setShow] = useState(false);
       
    return (
        <div className="text">
            <StyledLabel htmlFor={props.name}>{props.label}</StyledLabel>

            {props.type !== "password" && <StyledTextInput {...field} {...props}/>}

            {props.type === "password" && (
                <StyledTextInput 
                    invalid={meta.touched && meta.error}
                    {...field} {...props} type={show ? "text" : "password"}
                    />
                )
            }

            <StyledIcon>{icon}</StyledIcon>

            {
                props.type === "password" && (
                <StyledIcon onClick={() => setShow(!show)} right>
                   {show && <FiEye />}
                    {!show && <FiEyeOff />}
                </StyledIcon>
            )}

            {meta.touched && meta.error ? (
                <StyledErrorMessage>{meta.error}</StyledErrorMessage>
            ) : (
                <StyledErrorMessage style={{visibility: "hidden"}}>.</StyledErrorMessage>
            )}
        </div>
    )
}
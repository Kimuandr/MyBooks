import axios from "axios";
import {sessionService} from "redux-react-session";



const BASE_URL = "http://localhost:8080/api/";

export const loginUser = (credentials, history, setFieldError, setSubmitting) => {

    return () =>{

        axios.post(`${BASE_URL}/login`, 
        credentials,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
        ).then(res => {
            const {data} = res;
            console.log(data);

            if (data.status) {
                const {message} = data;
                setFieldError("email", message);
                setFieldError("password", message);
                
            } else {
            
            const jwt = data.accessJwt;

            sessionService.saveSession(jwt).then(() => {
                sessionService.saveUser(data).then(() => {
                history.push("/dashboard")
                }).catch(err => console.error(err))
            }).catch(err => console.error(err))
            }
            setSubmitting(false);
        }).catch(err => console.error(err))
    }
}

export const registerUser = (credentials, history, setFieldError, setSubmitting) => {

    return (dispatch) => {

        axios.post(`${BASE_URL}/register`, 
        credentials,
        {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            const {data} = res;
            if (data.status) {
                const {message} = data;
                setFieldError("name", message);
                setFieldError("email", message);
                setFieldError("password", message);
                
            } else {
                const {email} = credentials;
                history.push(`/activate/${email}`);
            }
            setSubmitting(false);
        }).catch(err => console.error(err))
    }
}

export const logoutUser = (history) => {

    return () => {
        sessionService.deleteSession();
        sessionService.deleteUser();
        history.push("/");
    }
}
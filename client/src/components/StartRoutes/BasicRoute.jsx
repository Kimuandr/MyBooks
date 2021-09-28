import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const BasicRoute = ({children, isAuth, ...rest}) => {
    return (
        <Route {...rest} render={({location}) => !isAuth ? (children) : (
            <Redirect to={{
                pathname: "/dashboard",
                state: {from: location}
            }}/>
        )}/>
    )
}

const mapStateToProps = ({session}) => ({
    isAuth: session.isAuth
})

export default connect(mapStateToProps)(BasicRoute);
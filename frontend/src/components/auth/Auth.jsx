import React from 'react'
import { withRouter } from 'react-router-dom';
import userService from '../../Services/UserService';

const Auth = (props) => {

    React.useEffect(()=> {
        if(!userService.isLoggedIn())
        {
            props.history.push('/login');
        }
    })
    return <>{props.children}</>;
}
 
export default withRouter(Auth);
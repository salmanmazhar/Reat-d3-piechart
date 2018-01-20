/*______________________________________________________________________
Login and chart related actions are combined into one module here, 
These can however be separated into separate modules as the application
scales.
______________________________________________________________________*/


// 1 - Takes a boolean flag and user and sets user loggedin state to that
export const login = (username, status) => {
    return {
        type: 'SET_LOGIN_STATUS',
        username: username,
        status: status
    }
}

// 2 - Takes user credentials and makes an async call for loggin user
//   - dispatches login action based on response
export const performLogin = (username, password) => {
    return (dispatch) => {
        dispatch(login(username,true));
    }
}

/*______________________________________________________________________
Login and chart related actions are combined into one module here, 
These can however be separated into separate modules as the application
scales.
______________________________________________________________________*/


// 1 - Takes a boolean flag and sets user loggedin state to that
export const login = (data) => {
    return {
        type: 'SET_LOGIN_STATUS',
        data
    }
}


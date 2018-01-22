import Parse from 'parse'
/*______________________________________________________________________
Login and chart related actions are combined into one module here, 
These can however be separated into separate modules as the application
scales.
______________________________________________________________________*/


// 1 - Sets a loggedin flag in store. 
//     0-> logged out, 1 logged in, 2 -> error, 3-> loading
export const setLoginStatus = (status) => {
    return {
        type: 'SET_LOGIN_STATUS',
        status: status
    }
}

export const setUser = (user)=>{
    return {
        type: 'SET_USER',
        user
    }
}

// 2 - Takes user credentials and makes an async call for logging user in
//   - dispatches login action based on response
//   - 0-> logged out, 1 logged in, 2 -> error, 3-> loading
export const performLogin = (username, password) => {
    return (dispatch) => {
        dispatch(setUser({statusCode:3}));

        Parse.User.logIn(username, password).then(function(user) {
            console.log("User",Parse.User.current());
            dispatch(setUser({...user,statusCode:1}));
          }, function(err) {
            dispatch(setUser({statusCode:2}))  
            console.log(err);
          });
    }
}


export const performLogout = () => {
    return (dispatch)=>{
        console.log("Performing logout");
        Parse.User.logOut().then(()=>{
            console.log("current user",Parse.User.current().attributes());
            if(Parse.User.current() == null) {
                dispatch(setUser({statusCode:0}))
            } 
            else{
                throw "Error logging user out";
            }
        })
    }
}

export const appendToAllUsers =(allUsers)=>{
    return{
        type: 'APPEND_TO_ALL_USERS',
        allUsers
    }
}

export const groupUserGenders = (allUsers)=>{
    let genderTypes = [];
    
}

export const fetchAllUsers = (skip) => {
 
    //Change the following limit to see recurssion
    const fetchLimit = 1000; 
    // Initilise skip count to zero if dispatched non recursively
    let skipCount = skip? skip:0; 

    return (dispatch,getState)=>{
        var query = new Parse.Query("CustomerProfile");
            query.skip(skipCount);
            query.limit(1000);
        query.find((users)=>{
            dispatch(appendToAllUsers(users));
        });

        query.count((count)=>{
            if(skipCount+100<count){            
                dispatch(fetchAllUsers(fetchLimit))
            }
            else{
                dispatch(groupUserGenders(getState().allUsers));
            }
        },
        (err)=>{
            
        })
    }
}
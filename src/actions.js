/**********************************************************************
Login and chart related actions are combined into one module here, 
These can however be separated into separate modules as the application
scales.
**********************************************************************/
import Parse from 'parse'
import * as d3 from "d3"

/*____________________________________________________________________
Takes a user object and sets it in the store's user property
User object must contain a statusCode for login status
_____________________________________________________________________*/
export const setUser = (user)=>{
    return {
        type: 'SET_USER',
        user
    }
}

/*____________________________________________________________________
Middleware action to trigger login in parse and dispatch setUser based
on response. A property for statusCode is appended to user object to 
signify the login state. These status codes include
 0-> logged out, 1 logged in, 2 -> error, 3-> loading
_____________________________________________________________________*/
export const performLogin = (username, password) => {
    return (dispatch) => {
        dispatch(setUser({statusCode:3}));

        Parse.User.logIn(username, password).then(function(user) {
            dispatch(setUser({...user,statusCode:1}));
          }, function(err) {
            dispatch(setUser({statusCode:2}))  
            console.log(err);
          });
    }
}

/*____________________________________________________________________
Middleware action to trigger logout in parse and dispatch setUser based
on response. Basically just clear unwanted properties from store
_____________________________________________________________________*/
export const performLogout = () => {
    return (dispatch)=>{
        Parse.User.logOut().then(()=>{
            if(Parse.User.current() == null) {
                dispatch(setUser({statusCode:0}));
                dispatch(setAllUser([]));
            } 
            else{
                throw "Error logging user out";
            }
        })
    }
}

/*____________________________________________________________________
Takes a users array and sets it in the store's allUsers property
_____________________________________________________________________*/
export const setAllUser = (users)=>{
    return {
        type: 'SET_ALL_USER',
        users
    }
}

/*____________________________________________________________________
Takes a users array and merge it to existing users in store
_____________________________________________________________________*/
export const appendToAllUsers =(allUsers)=>{
    return{
        type: 'APPEND_TO_ALL_USERS',
        allUsers
    }
}

/*____________________________________________________________________
Takes an array grouped by gender and sets it in store
_____________________________________________________________________*/
export const setGenderGroups =(groups)=>{
    return{
        type:'SET_GENDER_GROUPS',
        groups
    }
}

/*____________________________________________________________________
Groups users based on their genders and add a count for them
_____________________________________________________________________*/
export const groupUserGenders = (allUsers)=>{
    return (dispatch)=>{
        /*Grouping data using D3. This is performed in actions
        to decouple application logic from components, otherwise
        it could also be performed in component under
        componentWillReceiveProps() method of piechart*/

        const groupedByGender = d3.nest()
        .key((d)=>{ return d.get("sex") })
        .rollup((allUsers)=> { return allUsers.length; })
        .entries(allUsers);

        dispatch(setGenderGroups(groupedByGender));
    }
}

/*____________________________________________________________________
Fetches all users from the parse server. If the users result is more than
the specified limit, recursivly trigger another request till all users
are received
_____________________________________________________________________*/
export const fetchAllUsers = (skip) => {
 
    //Reduce the following limit to see recurssion
    //Setting it to 1000 to avoid multiple requests
    const fetchLimit = 1000;

    // Initilise skip count to zero if dispatched non recursively
    skip = skip ? skip:0; 

    return (dispatch,getState)=>{
        var query = new Parse.Query("CustomerProfile");
            query.skip(skip);
            query.limit(fetchLimit);
        query.find((users)=>{
            dispatch(appendToAllUsers(users));
        });

        query.count((count)=>{
            if(skip+100<count){            
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
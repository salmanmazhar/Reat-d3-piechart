/**********************************************************************
Single reducer for both login and user related actions, in future 
if the application extends this can be separeted into separate reducer 
files
**********************************************************************/

import Parse from 'parse';

let currentUser = Parse.User.current()?{...Parse.User.current(),statusCode:1}:{statusCode:0};

let appStore = (state = {user:currentUser,allUsers:[],genderGroups:[]}, action)=>{
    switch (action.type){
        case 'SET_USER':
            return {...state,
                user:action.user
            }
            break
        case 'APPEND_TO_ALL_USERS':
            return {...state,
                allUsers:[...state.allUsers,...action.allUsers]
            }
        case 'SET_ALL_USER':
            return {...state,
            allUsers:action.users}
        case 'SET_GENDER_GROUPS':
            return {...state,
                genderGroups:action.groups
            }        
        default:
            return state   
    }
}

export default appStore;
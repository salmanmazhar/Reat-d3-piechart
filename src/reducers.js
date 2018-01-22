import Parse from 'parse';

let currentUser = Parse.User.current()?{...Parse.User.current(),statusCode:1}:{statusCode:0};

let appStore = (state = {user:currentUser,allUsers:[]}, action)=>{
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
        default:
            return state   
    }
}

export default appStore;
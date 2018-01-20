let user = (state = {loggedIn:false,data:[10,20,30]}, action)=>{
    switch (action.type){
        case 'SET_LOGIN_STATUS':
            return {...state,
                loggedIn:action.status,
                username:action.username}
            break
        default:
            return state   
    }
}

export default user;
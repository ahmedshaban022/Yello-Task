

const usersReducer=(state={},action)=>{

    switch(action.type){
        case 'IS_LOGGED_IN': return state.isLoggedIn=action.value;
        case 'ALL_USERS_LIST' : return state.allUsers=action.users;
        case 'CURRENT_USER' : return state.currentUser=action.user;
        default: return state
    }
}

export default usersReducer;
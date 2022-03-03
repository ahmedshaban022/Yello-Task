export const isLoggedIn=(value)=>({
    type:"IS_LOGGED_IN",
    value
});

export const allUsers=(users)=>({
    type:"ALL_USERS_LIST",
    users
})

export const crruentUser=(user)=>({
    type:"CURRENT_USER",
    user
});

const postsReducer=(state=[],action) =>{

    switch(action.type)
    {
        case "SET_POSTS": 
        console.log(action.posts,"ss");
        return state=action.posts;
        default : return state
    }

}
export default postsReducer;
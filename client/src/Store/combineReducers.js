
import { combineReducers } from "redux";
import usersReducer from "./users/usersReducer";
import postsReducer from "./posts/postsReducer";




export default combineReducers({
    users:usersReducer,
    posts:postsReducer

})
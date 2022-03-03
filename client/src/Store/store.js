import { createStore } from "redux";
import combineReducers from "./combineReducers";

export const store = createStore(combineReducers)
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import anecdotesReducer from "./reducers/anecdoteReducer";

// const reducer = combineReducers({
//   anecdotes: anecdotesReducer,
// });

const store = createStore(anecdotesReducer, composeWithDevTools());

export default store;

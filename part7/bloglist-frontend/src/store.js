import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// import noteReducer from "./reducers/noteReducer";
// import filterReducer from "./reducers/filterReducer";

const reducer = combineReducers({});

const store = createStore(reducer, composeWithDevTools());

export default store;

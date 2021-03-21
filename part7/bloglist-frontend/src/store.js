import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import reduxLogger from "redux-logger";

import messages from "./reducers/messages";
import blogs from "./reducers/blogs";
import currentUser from "./reducers/currentUser";
import users from "./reducers/users";

const middleware = [reduxThunk, reduxLogger];

const reducer = combineReducers({ messages, blogs, currentUser, users });

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

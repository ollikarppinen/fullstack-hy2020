import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import reduxLogger from "redux-logger";

import messages from "./reducers/messages";
import blogs from "./reducers/blogs";
import user from "./reducers/user";

const middleware = [reduxThunk, reduxLogger];

const reducer = combineReducers({ messages, blogs, user });

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

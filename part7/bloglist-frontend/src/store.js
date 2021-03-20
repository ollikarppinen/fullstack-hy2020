import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import reduxLogger from "redux-logger";

import messages from "./reducers/messages";

const middleware = [reduxLogger, reduxThunk];

const reducer = combineReducers({ messages });

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

import { combineReducers, legacy_createStore as createStore } from "redux";

// REDUCERS
import { reducerLoading } from "./reducers/loading.js";
import { reducerUser } from "./reducers/user.js";

let store = combineReducers({
  loading: reducerLoading,
  user: reducerUser,
});

export default createStore(store);

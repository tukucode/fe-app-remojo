import { combineReducers, legacy_createStore as createStore } from "redux";

// REDUCERS
import { reducerCounter } from "./reducers/counter.js";
import { reducerLoading } from "./reducers/loading.js";

let store = combineReducers({
  counter: reducerCounter,
  loading: reducerLoading,
});

export default createStore(store);

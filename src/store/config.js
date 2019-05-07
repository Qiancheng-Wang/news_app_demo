import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import postReducr from "./reducers/postsReducer";
import errerReducer from "./reducers/errorsReducer";
import fontsizeReducer from "./reducers/fontsizeReducer";

const rootReducer = combineReducers({
  posts: postReducr,
  errors: errerReducer,
  fontsize: fontsizeReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;

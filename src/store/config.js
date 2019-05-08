import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { AsyncStorage } from "react-native";
import { persistStore, persistReducer } from "redux-persist";

import postReducr from "./reducers/postsReducer";
import errerReducer from "./reducers/errorsReducer";
import fontsizeReducer from "./reducers/fontsizeReducer";

const rootReducer = combineReducers({
  posts: postReducr,
  errors: errerReducer,
  fontsize: fontsizeReducer
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["fontsize"]
};

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const persistorReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  let store = createStore(
    persistorReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;

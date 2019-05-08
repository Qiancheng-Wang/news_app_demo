/**
 * @format
 */

import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import App from "./App";
import { name as appName } from "./app.json";
import { PersistGate } from "redux-persist/integration/react";

import configureStore from "./src/store/config";
const { store, persistor } = configureStore();

export default class RNRedux extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => RNRedux);

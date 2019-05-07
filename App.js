/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import MainPage from "./src/components/MainPage/MainPage";
import SinglePostViewer from "./src/components/SinglePostViewer/SinglePostViewer";

const MainNavigator = createStackNavigator({
  Home: { screen: MainPage },
  Post: { screen: SinglePostViewer }
});

const AppNavigator = createAppContainer(MainNavigator);

class App extends Component {
  render() {
    return <AppNavigator />;
  }
}
export default App;

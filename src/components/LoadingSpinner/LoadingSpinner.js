import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";

class LoadingSpinner extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.LoadingSpinner}
          source={require("./spinner.gif")}
        />
      </View>
    );
  }
}

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: "100%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  LoadingSpinner: {
    width: 400,
    height: 400
  }
});

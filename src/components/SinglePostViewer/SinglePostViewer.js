import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
class SinglePostViewer extends Component {
  static navigationOptions = {
    title: "Post"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    );
  }
}

export default SinglePostViewer;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "yellow"
  }
});

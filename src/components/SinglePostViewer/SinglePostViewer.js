import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, WebView } from "react-native";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { stringLiteral } from "@babel/types";

class SinglePostViewer extends Component {
  static navigationOptions = {
    title: "Post"
  };

  formatDate = gmt_date => {
    date_str = gmt_date.toString();
    return (
      date_str.slice(0, 4) +
      "年" +
      date_str.slice(5, 7) +
      "月" +
      date_str.slice(8, 10) +
      "日 " +
      date_str.slice(11, 16)
    );
  };

  render() {
    const { loading } = this.props.posts;

    let content;
    if (loading) {
      content = <LoadingSpinner />;
    } else {
      const { selectedPost } = this.props.posts;

      const date = this.formatDate(selectedPost.date);
      content = (
        <View>
          <Text>{selectedPost.title.rendered}</Text>
          <Text>{date}</Text>
          <WebView
            style={{ fontSize: 30 }}
            automaticallyAdjustContentInsets={true}
            html={selectedPost.content.rendered}
          />
        </View>
      );
    }

    return <View style={styles.container}>{content}</View>;
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    errors: state.errors
  };
};

export default connect(mapStateToProps)(SinglePostViewer);

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

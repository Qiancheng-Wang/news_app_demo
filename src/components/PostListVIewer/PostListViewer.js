import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import axios from "axios";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const { width } = Dimensions.get("window");

class PostListViewer extends Component {
  constructor() {
    super();

    this.state = {
      defaultPage: 1,
      defaultNumPerPage: 10,
      data: null,
      error: null,
      refreshing: false
    };
  }

  async componentDidMount() {
    const { defaultPage, defaultNumPerPage } = this.state;

    try {
      const data = await axios.get(
        `https://staging.allfin.com/wordpress/wp-json/wp/v2/posts?page=${defaultPage}&per_page=${defaultNumPerPage}`
      );
      this.setState({
        data: data.data
      });
    } catch (err) {
      this.setState({
        error: err
      });
    }
  }

  renderItem = ({ item }) => {
    const CoverImageURL = item.type_img_mobile_small;
    let ConverImageContent;
    if (CoverImageURL) {
      ConverImageContent = (
        <Image
          style={styles.withCoverImage}
          source={{ uri: item.type_img_mobile_small }}
        />
      );
    } else {
      ConverImageContent = (
        <View style={styles.withoutCoverImage}>
          <Text>Sorry, Did not found Cover Image for this post</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        key={item.id.toString()}
        style={{ flex: 0, width: "95%", margin: 10, backgroundColor: "white" }}
        // onPress={() => {
        //   this.selectMomment(item.moment._id, item.eventType);
        // }}
      >
        <View style={styles.postContainer}>
          {ConverImageContent}
          <View style={styles.postTitleContainer}>
            <Text>{item.title.rendered}}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _onLoad = () => {
    console.log("Load Posts");
    // todo concat load posts.
  };

  _onRefresh = () => {
    const { defaultPage, defaultNumPerPage } = this.state;

    this.setState({
      refreshing: true
    });

    //let refreshing is more explicit,
    //otherwise refreshing is too fast
    setTimeout(async () => {
      try {
        const data = await axios.get(
          `https://staging.allfin.com/wordpress/wp-json/wp/v2/posts?page=${defaultPage}&per_page=${defaultNumPerPage}`
        );
        this.setState({
          data: data.data,
          refreshing: false
        });
      } catch (err) {
        this.setState({
          error: err,
          refreshing: false
        });
      }
    }, 1500);
  };

  render() {
    let renderContent;
    if (this.state.data) {
      renderContent = (
        <View style={styles.container}>
          <FlatList
            style={styles.flatliststyle}
            horizontal={false}
            data={this.state.data}
            keyExtractor={item => item.id.toString()} //item.key}
            renderItem={this.renderItem}
            numColumns={1}
            onEndReachedThreshold={0}
            onEndReached={() => this._onLoad()}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this._onRefresh()}
                title="Refreshing"
              />
            }
          />
        </View>
      );
    } else {
      renderContent = <LoadingSpinner />;
    }

    return renderContent;
  }
}

export default PostListViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  withCoverImage: {
    width: width * 0.3,
    height: width * 0.25,
    borderWidth: 2,
    borderRadius: 10
  },
  withoutCoverImage: {
    width: width * 0.3,
    height: width * 0.25,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
    //backgroundColor: "blue"
  },
  postContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  postTitleContainer: {
    width: width - width * 0.38,
    marginLeft: "5%",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  flatliststyle: {
    width: width * 0.98
  }
});

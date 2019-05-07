import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Button,
  Slider
} from "react-native";
import HTML from "react-native-render-html";

import { changeFontSize } from "../../store/actions/fontsize";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const { width } = Dimensions.get("window");

var fontSizeGlobal;

class SinglePostViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderFontSize: this.props.fontsize.fontsize, //Default
      showSlider: false
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({ toggleSlider: this.toggleSlider });

    fontSizeGlobal = this.props.fontsize.fontSize;
    console.log("globel size", fontSizeGlobal);
  }

  toggleSlider = () => {
    if (this.state.showSlider) {
      this.setState({
        showSlider: false
      });

      this.props.onChangeFontSize(this.state.sliderFontSize);
    } else {
      this.setState({
        showSlider: true
      });
    }
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Post",
      headerRight: (
        <Button onPress={() => params.toggleSlider()} title="A" color="black" />
      )
    };
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

  changeFontSizeHandler = size => {
    sizeInt = parseInt(size);
    this.setState({
      sliderFontSize: sizeInt
    });
    // this.props.onChangeFontSize(sizeInt);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.fontsize.fontSize !== this.state.sliderFontSize) {
      fontSizeGlobal = nextProps.fontsize.fontSize;
    }
  }

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
          {this.state.showSlider ? (
            <View style={styles.sliderContainer}>
              <Slider
                style={{ marginLeft: width * 0.05 }}
                width={width * 0.7}
                value={this.state.sliderFontSize}
                minimumValue={8}
                maximumValue={40}
                onValueChange={size => this.changeFontSizeHandler(size)}
              />
              <View style={styles.sliderValueContainer}>
                <Text style={{ color: "white", fontSize: 18 }}>Min 8</Text>
                <Text style={{ color: "pink", fontSize: 20 }}>
                  {this.state.sliderFontSize}
                </Text>
                <Text style={{ color: "white", fontSize: 18 }}>Max 40</Text>
              </View>
            </View>
          ) : null}

          <Text>{selectedPost.title.rendered}</Text>
          <Text>{date}</Text>
          <ScrollView style={{ flex: 1, width: width * 0.95 }}>
            <HTML
              html={selectedPost.content.rendered}
              allowFontScaling={true}
              baseFontStyle={styles.dynamicFont}
              //imagesMaxWidth={width}
              imagesInitialDimensions={{
                width: width * 0.9,
                height: width * 0.72
              }}
              containerStyle={{
                justifyContent: "center",
                alignItems: "center"
              }}
            />
          </ScrollView>
        </View>
      );
    }

    return <View style={styles.container}>{content}</View>;
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    errors: state.errors,
    fontsize: state.fontsize
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeFontSize: fontSize => dispatch(changeFontSize(fontSize))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SinglePostViewer);

var styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "yellow"
  },
  sliderContainer: {
    position: "absolute",
    height: 80,
    width: width * 0.8,
    left: width * 0.1,
    right: width * 0.1,
    top: width * 0.5,
    backgroundColor: "rgba(52,52,52,0.8)",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    zIndex: 2,
    borderRadius: 10
  },
  sliderValueContainer: {
    marginLeft: width * 0.05,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    width: width * 0.7
  },
  dynamicFont: {
    fontSize: fontSizeGlobal
  }
});

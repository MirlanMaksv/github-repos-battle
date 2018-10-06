import React, { Component } from "react";
import PropTypes from "prop-types";

const styles = {
  content: {
    textAlign: "center",
    fontSize: "35px"
  }
};

export default class Loading extends Component {
  state = { text: this.props.text };

  componentDidMount = () => {
    let { text: originalText, speed } = this.props;
    let stopper = originalText + "...";
    this.interval = setInterval(() => {
      if (this.state.text === stopper) {
        this.setState({ text: originalText });
      } else {
        this.setState((prevState, props) => {
          return { text: prevState.text + "." };
        });
      }
    }, speed);
  };

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  render() {
    return <p style={styles.content}>{this.state.text}</p>;
  }
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number
};

Loading.defaultProps = {
  text: "Loading",
  speed: 300
};

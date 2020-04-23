import React, { Component } from "react";
import moment from "moment";
import { Typography } from "@material-ui/core";

export default class WebTimeElapsed extends Component {
  props: {
    time: string,
    interval?: number,
    hideAgo?: boolean,
    isValid?: boolean
  } = {
      time: "",
      interval: 0,
      hideAgo: false,
      isValid: true
    };
  state: { timer: number | null } = { timer: null };

  static defaultProps = {
    hideAgo: false,
    interval: 60000,
  };

  componentDidMount() {
    this.createTimer();
  }

  createTimer = () => {
    this.setState({
      timer: setTimeout(() => {
        // console.log("Timer")
        this.update();
      }, this.props.interval),
    });
  };

  componentWillUnmount() {
    this.state.timer && clearTimeout(this.state.timer);
  }

  update = () => {
    this.forceUpdate();
    this.createTimer();
  };

  render() {
    const { time, hideAgo, isValid = true } = this.props;
    return (
      <Typography {...this.props}>
        {isValid ? `Last updated ${moment(time).fromNow(hideAgo)}` : time}
      </Typography>
    );
  }
}

import React, {Component} from 'react';
import {View, Text} from 'react-native';
import moment from 'moment';

export default class TimeElapsed extends Component {
  props: {
    time: string,
    interval?: number,
    hideAgo?: boolean,
  };
  state: {timer: null | number} = {timer: null};

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
    clearTimeout(this.state.timer);
  }

  update = () => {
    this.forceUpdate();
    this.createTimer();
  };

  render() {
    const {time, hideAgo, isValid = true} = this.props;
    return <Text {...this.props}>{isValid ? `Last updated ${moment(time).fromNow(hideAgo)}` : time}</Text>;
  }
}

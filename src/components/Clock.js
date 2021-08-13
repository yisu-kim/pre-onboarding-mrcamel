import { Component } from "react";
import PropTypes from "prop-types";
import { initStorage } from "utils/storage/init";
import lastVisitedDateStorage from "utils/storage/lastVisitedDate";

class Clock extends Component {
  state = {
    date: new Date(),
  };

  static propTypes = {
    handleStorageUpdate: PropTypes.func,
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentDidUpdate() {
    if (new Date().getDate() !== lastVisitedDateStorage.get()) {
      initStorage();
      this.props.handleStorageUpdate();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return null;
  }
}

export default Clock;

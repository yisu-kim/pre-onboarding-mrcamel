import { Component } from 'react';
import { initStorage } from 'utils/storage/init';
import lastVisitedDateStorage from 'utils/storage/lastVisitedDate';

type ClockProps = {
  handleStorageUpdate: () => void;
};

type ClockState = {
  date: Date;
};

class Clock extends Component<ClockProps, ClockState> {
  constructor(props: ClockProps) {
    super(props);
    this.timerID = undefined;
  }

  timerID: NodeJS.Timer | undefined;

  state = {
    date: new Date(),
  };

  componentDidMount(): void {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentDidUpdate(): void {
    if (new Date().getDate() !== lastVisitedDateStorage.get()) {
      initStorage();
      this.props.handleStorageUpdate();
    }
  }

  componentWillUnmount(): void {
    clearInterval(this.timerID as NodeJS.Timer);
  }

  tick(): void {
    this.setState({
      date: new Date(),
    });
  }

  render(): null {
    return null;
  }
}

export default Clock;

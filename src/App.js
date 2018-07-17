import React, { Component } from "react";
import Countdown from "react-countdown-now";
import Modal from "react-responsive-modal";
import "./App.css";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHour: "00",
      currentMinutes: "00"
    };
  }
  formatTime(type, time) {
    if (type === "minute") {
      //format minute
      if (time < 10) {
        return `0${time}`;
      } else {
        return time;
      }
    }
    if (type === "hour") {
      //format minute
      if (time < 10) {
        return `0${time}`;
      } else {
        return time;
      }
    }
  }

  setTime() {
    let currentHour = this.formatTime("hour", new Date().getHours());
    let currentMinutes = this.formatTime("minute", new Date().getMinutes());

    this.setState({
      currentHour,
      currentMinutes
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.setTime();
      // console.log("setting");
    }, 1000);
  }
  render() {
    return (
      <div className="col-md-4">
        <h3 className="text-center mt-5 mb-5 title">TIME</h3>
        <h1 className="text-center time mt-6">
          {this.state.currentHour} : {this.state.currentMinutes}
        </h1>
      </div>
    );
  }
}

// export default SideBar;

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <span>Time Up!!!</span>;
  } else {
    // Render a countdown
    return (
      <span>
        {hours}:{minutes}:{seconds}
      </span>
    );
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventTime: 60 * 2000,
      duration: 0,
      speaker: "___",
      open: false,
      topic: "",
      counting: false,
      upNext: ""
    };
  }

  toggleModal() {
    this.setState({ open: !this.state.open });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    let convertedMins = this.state.duration * 60 * 1000; //converting time to mileseconds;
    this.setState({ eventTime: convertedMins, counting: true, open: false });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <SideBar />
          <div className="col-md-8 centrally">
            <button
              className="btn btn-primary stn-btn"
              onClick={this.toggleModal.bind(this)}>
              <span>&#9881;</span>
            </button>
            {this.state.counting && (
              <h3 className="text-center mt-5 mb-5 title">TIME LEFT</h3>
            )}
            {!this.state.counting && (
              <h3 className="text-center mt-5 mb-5 title">EVENT</h3>
            )}
            <div className="row">
              <div className="col-md">
                <h1 className="digit">
                  {!this.state.counting && <span>-- : -- : --</span>}
                  {this.state.counting && (
                    <Countdown
                      daysInHours={true}
                      date={Date.now() + this.state.eventTime}
                      renderer={renderer}
                    />
                  )}
                </h1>
                <hr
                  className="mt-3 mb-3"
                  style={{ borderTop: "solid 1px #ccc" }}
                />
                <div className="mt-5">
                  <h3 className="text-center title">SPEAKER:</h3>
                  <h3 className="text-center title">{this.state.speaker}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal open={this.state.open} onClose={this.toggleModal.bind(this)}>
          <div className="modalContent">
            <form onSubmit={this.onSubmit.bind(this)}>
              <fieldset>
                <legend>Current Section</legend>
                <div className="form-group row">
                  <label htmlFor="speaker" className="col-sm-2 col-form-label">
                    Speaker's Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control-plaintext"
                      id="speaker"
                      name="speaker"
                      value={this.state.speaker}
                      onChange={this.onChange.bind(this)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="duration" className="col-sm-2 col-form-label">
                    Duration (mins)
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control-plaintext"
                      id="duration"
                      name="duration"
                      value={this.state.duration}
                      onChange={this.onChange.bind(this)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleTextarea">Topic</label>
                  <textarea
                    className="form-control"
                    id="exampleTextarea"
                    rows={3}
                    name="topic"
                    defaultValue={this.state.topic}
                    onChange={this.onChange.bind(this)}
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </fieldset>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;

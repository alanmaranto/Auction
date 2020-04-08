import React, { useState, useEffect } from "react";
import "./style.css";

const Clock = (props) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);
    return cleanup(timerID);
  });

  const tick = () => {
    setDate(new Date());
  };

  const cleanup = () => {
    clearInterval();
  };

  return (
    <div className="native-clock">
      <div className="local-time">
        <h3>Hora Local</h3>
      </div>
      <div className="clock-time">
        <h2>{date.toLocaleTimeString()}</h2>
      </div>
    </div>
  );
};

export default Clock;

/* class ReactThing extends React.Component {
    constructor(props){
      super(props);
      
      this.state = {
        time: new Date()
      };
    }
    
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
    
    tick() {
      this.setState({
        time: new Date()
      });
    }
    
    render() {
     return (
      <p className="react-clock">{this.state.time.toLocaleTimeString()}</p>
     );
   } 
  } */

import React from "react";
import Clock from "react-live-clock";

const LiveClock = () => {
  return (
    <Clock
      // className={css.ukFormat}
      format={"h:mm:ssa"}
      style={{ fontSize: "1.5em" }}
      ticking={true}
    />
  );
};

export default LiveClock;

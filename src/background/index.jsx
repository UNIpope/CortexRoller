import React from "react";

import trackersbackgroundsvg from "./trackers-background.svg";
import "./background.css"

class Trackersbackground extends React.Component {
  render() {
    return (
      <div className="trackersback-container">
        <img src={trackersbackgroundsvg} alt="background" draggable="false"/>
      </div>
    );
  }
}
export default Trackersbackground;
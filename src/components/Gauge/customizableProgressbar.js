import React, { Component } from "react";
import PropTypes from "prop-types";

class CustomizableProgressbar extends Component {
  polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  describeArc = (x, y, radius, startAngle, endAngle) => {
    var start = this.polarToCartesian(x, y, radius, endAngle);
    var end = this.polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y
    ].join(" ");

    return d;
  };

  render() {
    const leftarc = this.describeArc(70, 70, 60, 180, 360);
    const rightarc = this.describeArc(250, 70, 60, 0, 180);
    const path =
      leftarc + " M 70 130 L 250 130" + rightarc + "M 250 10 L 60 10 ";

    return (
      <svg width="400" height="150">
        <path fill="none" id="arc0" d={path} stroke="#446688" strokeWidth="5" />
        <circle r="5" fill="red">
          <animateMotion dur="3600s" repeatCount="indefinite">
            <mpath href="#arc0" />
          </animateMotion>
        </circle>
      </svg>
    );
  }
}

export default CustomizableProgressbar;

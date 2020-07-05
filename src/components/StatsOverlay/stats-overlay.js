import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./stats-overlay.scss";
import Overlay from "../@shared/overlay";

export default class StatsOverlay extends PureComponent {
  static propTypes = {
    closeOverlay: PropTypes.func.isRequired
  };

  render() {
    return (
      <Overlay className="stats-overlay">
        <h1> Statistics</h1>
        <table>
          <tbody>
            <tr>
              <td className="stat-number">33333</td>
              <td className="stat-label">99999</td>
            </tr>
          </tbody>
        </table>
      </Overlay>
    );
  }
}

import React, { Fragment, Component } from "react";
import { ipcRenderer } from "electron";
import PropTypes from "prop-types";
// Styles
import styles from "./home.scss";
import Gauge from "../Gauge";
import Agenda from "../Agenda";
import StatsOverlay from "../StatsOverlay";

import { SEND_TOGGLE_COMPACT } from "../../constants/ipc_channels";

export default class Home extends Component {
  static propTypes = {
    compact: PropTypes.bool.isRequired,
    overlay: PropTypes.string.isRequired,
    toggleCompactMode: PropTypes.func.isRequired
  };
  componentWillMount() {
    const { toggleCompactMode } = this.props;
    // Listeners from main process
    ipcRenderer.on(SEND_TOGGLE_COMPACT, toggleCompactMode);
  }
  static createOverlayComp(overlay) {
    switch (overlay) {
      case "none":
        return null;
      case "statistics":
        return <StatsOverlay />;
      default:
        throw Error(
          `Cannot display overlay: Overlay type "${overlay}" does not exist`
        );
    }
  }

  render() {
    const { compact, overlay } = this.props;
    const overlayComp = Home.createOverlayComp(overlay);
    console.log(overlay);
    return (
      <Fragment>
        <div className={styles.container}>
          <Gauge />
          {!compact && <Agenda />}
        </div>
      </Fragment>
    );
  }
}

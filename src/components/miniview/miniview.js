import React, { Fragment, Component } from "react";
import { ipcRenderer } from "electron";
import PropTypes from "prop-types";
import Gauge from "../Gauge";
import Agenda from "../Agenda";
import { ON_CHANGE_WINDOW_SIZE } from "../../constants/ipc_channels";
import { ScreenSize } from "../../constants/enums";

export default class MiniView extends Component {
  static propTypes = {
    expandMode: PropTypes.bool.isRequired,
  };
  componentWillMount() {
    ipcRenderer.send(ON_CHANGE_WINDOW_SIZE, ScreenSize.NAV);
  }

  render() {
    const { expandMode } = this.props;
    return (
      <Fragment>
        <div className="miniview">
          <Gauge />
          {expandMode && <Agenda />}
        </div>
      </Fragment>
    );
  }
}

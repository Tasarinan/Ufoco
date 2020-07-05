import React, { Fragment, Component } from "react";
import { ipcRenderer } from "electron";
import PropTypes from "prop-types";
// Styles
import styles from "./home.scss";
import Bufl from "../bufl";
import Editor from "../journal";
import { SplitPane } from "react-collapse-pane";

export default class Home extends Component {
  static propTypes = {};

  render() {
    return (
      <Fragment>
        <div className={styles.container}>
          <SplitPane
            split="vertical"
            collapseOptions={{
              beforeToggleButton: <button>⬅</button>,
              afterToggleButton: <button>➡</button>,
              overlayCss: { backgroundColor: "black" },
              buttonTransition: "zoom",
              buttonPositionOffset: -20,
              collapsedSize: 50,
              collapseTransitionTimeout: 350,
            }}
          >
            <Bufl />
            <Editor />
          </SplitPane>
        </div>
      </Fragment>
    );
  }
}

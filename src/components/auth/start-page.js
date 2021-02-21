import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import appIcon from "../../assets/icons/app-icon.png";
import { ipcRenderer } from "electron";
import { ON_CHANGE_WINDOW_SIZE } from "../../constants/ipc_channels";
import { ScreenSize } from "../../constants/enums";

export default class StartPage extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      adding: false,
    };
  }

  togglePrompt = () => {
    this.setState(
      (prev) => ({ adding: !prev.adding, name: "", username: "" }),
      () => {
        const { adding } = this.state;
        if (adding) ipcRenderer.send(ON_CHANGE_WINDOW_SIZE, ScreenSize.EXPAND);
        else ipcRenderer.send(ON_CHANGE_WINDOW_SIZE, ScreenSize.NAV);
      }
    );
  };

  render() {
    const { children } = this.props;
    const { adding } = this.state;

    return (
      <React.Fragment>
        <div className="startpage-container">
          <img src={appIcon} alt="App icon" width={330} height={120} />
          <button
            className="startpage-menu"
            type="button"
            onClick={this.togglePrompt}
          >
            <i className="ri-login-circle-line"></i>
          </button>
          <div className="startpage-content"> {adding && children}</div>
        </div>
        <svg
          style={{ display: "none" }}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                result="blur"
                stdDeviation="5"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feComposite in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>
        </svg>
      </React.Fragment>
    );
  }
}

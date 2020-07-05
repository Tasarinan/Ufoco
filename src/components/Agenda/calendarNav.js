import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styles from "./calendarNav.scss";

export default class CalendarNav extends PureComponent {
  static propTypes = { openOverlay: PropTypes.func.isRequired };
  handleClickOnAddButton() {}
  render = () => {
    return (
      <div className={styles.container}>
        <button type="button" className={styles.leftnavbutton}></button>
        <button
          type="button"
          className={styles.addbutton}
          onClick={this.handleClickOnAddButton}
        >
          <svg
            xmlns="https://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
          >
            <g
              id="Symbols"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="plus" fill="#FFFFFF">
                <g id="Group">
                  <rect
                    id="Rectangle-3"
                    x="1.42108547e-14"
                    y="11"
                    width="24"
                    height="2"
                  ></rect>
                  <rect
                    id="Rectangle-3"
                    x="11"
                    y="1.95399252e-14"
                    width="2"
                    height="24"
                  ></rect>
                </g>
              </g>
            </g>
          </svg>
        </button>
        <button type="button" className={styles.rightnavbutton}></button>
      </div>
    );
  };
}

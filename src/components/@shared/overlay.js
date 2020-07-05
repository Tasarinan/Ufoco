import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./overlay.scss";
import { Icon } from "antd";

export default class Overlay extends PureComponent {
  static propTypes = {
    closeOverlay: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    // Function bindings
    this.onClick = this.onClick.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.overlayElement = null;
  }

  componentDidMount() {
    document.addEventListener("click", this.onClick);
    window.addEventListener("keydown", this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onClick);
    window.removeEventListener("keydown", this.onKeyDown);
  }
  /**
   * Close the overlay if the user clicks outside it
   */
  onClick(e) {
    e.preventDefault();
    let targetElement = e.target; // Clicked element

    /* eslint-disable-next-line no-constant-condition */
    while (true) {
      if (targetElement === this.overlayElement) {
        // Click inside overlay: Exit
        return;
      }
      if (targetElement.parentNode) {
        // Click outside overlay: Move up the DOM
        targetElement = targetElement.parentNode;
      } else {
        // DOM root is reached: Close overlay, exit
        this.onClose();
        return;
      }
    }
  }

  onClose() {
    const { closeOverlay } = this.props;

    closeOverlay();
  }

  /**
   * Close the overlay when the ESC key is pressed
   */
  onKeyDown(e) {
    if (e.key === "Escape") {
      this.onClose();
    }
  }

  render() {
    const { children, className } = this.props;

    return (
      <div className="overlay-outer">
        <div
          className={`overlay-inner ${className || ""}`}
          ref={overlayElement => {
            this.overlayElement = overlayElement;
          }}
        >
          <button
            type="button"
            className="button button-invisible overlay-close-button"
            onClick={this.onClose}
          >
            <Icon type="close" />
          </button>
          <div className="overlay-content">{children}</div>
        </div>
      </div>
    );
  }
}

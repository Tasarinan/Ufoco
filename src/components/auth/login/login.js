import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import appIcon from "../../../assets/icons/app-icon.png";
import cx from "classnames";
// Styles
import styles from "./login.scss";
// Components
import { message } from "antd";

export default class Login extends PureComponent {
  static propTypes = {
    decryptErrorMsg: PropTypes.string,
    decryptStatus: PropTypes.string.isRequired,
    userStatus: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      password: "",
      adding: false,
      isSubmitted: false,
    };

    // Function bindings
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangePassword(e) {
    this.setState({
      isSubmitted: false,
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { login } = this.props;
    const { password } = this.state;
    login(password);
    // Display error if password is incorrect
    this.setState({
      isSubmitted: true,
    });
    // Select entered password if it is incorrect
    this.input.select();
  }

  togglePrompt = () => {
    this.setState(
      (prev) => ({ adding: !prev.adding, name: "", username: "" }),
      () => {
        const { adding } = this.state;
        if (adding) this.input.focus();
      }
    );
  };

  render() {
    const { decryptErrorMsg, decryptStatus, userStatus } = this.props;
    const { isSubmitted, password, adding } = this.state;
    const modalClass = cx(styles.modal, {
      [styles.open]: adding,
    });
    const containerClass = cx(styles.container, {
      [styles.containerOpen]: adding,
    });
    const formClass = cx(styles.form, {
      [styles.formOpen]: adding,
    });

    return (
      <React.Fragment>
        <div className={styles.menu}>
          <img src={appIcon} alt="App icon" width={300} height={120} />
          <button
            className={styles.button}
            type="button"
            onClick={this.togglePrompt}
          >
            <i className="ri-login-circle-line "></i>
          </button>
          <div className={containerClass}>
            <div className={modalClass}>
              <form className={formClass} onSubmit={this.handleSubmit}>
                <input
                  className={styles.input}
                  type="password"
                  value={password}
                  placeholder="password"
                  autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                  required
                  onChange={this.handleChangePassword}
                  ref={(input) => {
                    this.input = input;
                  }}
                />
                <button type="submit" className={styles.submit}>
                  <i className="ri-key-fill ri-fw"></i>
                  {isSubmitted &&
                    userStatus === "invalid" &&
                    console.log(decryptErrorMsg)}
                </button>
              </form>
            </div>
          </div>
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

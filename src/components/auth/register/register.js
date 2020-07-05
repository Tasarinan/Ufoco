import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import appIcon from "../../../assets/icons/app-icon.png";
import cx from "classnames";
// Styles
import styles from "./register.scss";
// Components

export default class Register extends PureComponent {
  static propTypes = {
    register: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      password: "",
      emailaddress: "",
      adding: false,
    };

    // Function bindings
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmailaddress = this.handleChangeEmailaddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmailaddress(e) {
    const emailaddress = e.target.value;
    this.setState({
      emailaddress,
    });
  }
  handleChangePassword(e) {
    const password = e.target.value;
    this.setState({
      password,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { register } = this.props;
    const { password, emailaddress } = this.state;
    if (password != "" && emailaddress != "") {
      register(emailaddress, password);
    } else {
      throw Error("new account created failure");
    }
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
    const { password, emailaddress, adding } = this.state;

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
          <img src={appIcon} alt="App icon" width={300} height={80} />
          <button
            className={styles.button}
            type="button"
            onClick={this.togglePrompt}
          >
            <i className="ri-user-add-fill ri-fw"></i>
          </button>
          <div className={containerClass}>
            <div className={modalClass}>
              <form className={formClass} onSubmit={this.handleSubmit}>
                <label>Email</label>
                <input
                  type="text"
                  className={styles.input}
                  value={emailaddress}
                  name="username"
                  placeholder="mail address"
                  autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                  required
                  onChange={this.handleChangeEmailaddress}
                  ref={(input) => {
                    this.input = input;
                  }}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  value={password}
                  className={styles.input}
                  placeholder="password"
                  name="password"
                  autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                  required
                  onChange={this.handleChangePassword}
                />
                <div>
                  <button type="submit" className={styles.submit}>
                    Register
                  </button>
                </div>
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

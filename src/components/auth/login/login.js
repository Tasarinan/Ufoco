import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import StartPage from "../start-page.js";
import { ipcRenderer } from "electron";
import { ON_CHANGE_WINDOW_SIZE } from "../../../constants/ipc_channels";
import { ViewSize } from "../../../constants/enums";

export default class Login extends PureComponent {
  static propTypes = {
    register: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      password: "",
      emailaddress: "",
    };

    // Function bindings
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmailaddress = this.handleChangeEmailaddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    ipcRenderer.send(ON_CHANGE_WINDOW_SIZE, ViewSize.LOCK);
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

  render() {
    const { password, emailaddress } = this.state;
    return (
      <StartPage>
        <form className="password-creation-form" onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input
            type="text"
            value={emailaddress}
            name="username"
            placeholder="mail address"
            autoFocus // eslint-disable-line jsx-a11y/no-autofocus
            required
            onChange={this.handleChangeEmailaddress}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            placeholder="password"
            name="password"
            autoFocus // eslint-disable-line jsx-a11y/no-autofocus
            required
            onChange={this.handleChangePassword}
          />
          <button type="submit" className="button button-main">
            Register
          </button>
        </form>
      </StartPage>
    );
  }
}

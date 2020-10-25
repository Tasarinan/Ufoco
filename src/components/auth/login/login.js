import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import StartPage from "../start-page.js";
import { ipcRenderer } from "electron";
import { ON_CHANGE_WINDOW_SIZE } from "../../../constants/ipc_channels";
import { ScreenSize } from "../../../constants/enums";
import * as Yup from "yup";

export default class Login extends PureComponent {
  static propTypes = {
    login: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      password: "",
      emailaddress: "",
      submitted: false,
    };

    // Function bindings
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeEmailaddress = this.handleChangeEmailaddress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    ipcRenderer.send(ON_CHANGE_WINDOW_SIZE, ScreenSize.NAV);
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
    const { login } = this.props;
    const { password, emailaddress } = this.state;
    this.setState({ submitted: true });
    const schema = Yup.object().shape({
      email: Yup.string()
        .email("Email is invalid")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    });
    schema
      .validate({ email: emailaddress, password: password })
      .then(function (value) {
        login(value.email, value.password);
      })
      .catch(function (err) {
        console.log(err);
      });
    this.setState({ emailaddress: "", password: "" });
  }

  render() {
    const { password, emailaddress, submitted } = this.state;
    return (
      <StartPage>
        <form className="account-form" onSubmit={this.handleSubmit}>
          <h1 className="account-form-header">Sign in to UFOCO</h1>
          <label>
            Email address(*)
            {submitted && !emailaddress && (
              <div className="help-block">Email format is required</div>
            )}
          </label>
          <input
            type="text"
            value={emailaddress}
            name="username"
            placeholder="mail address"
            autoFocus // eslint-disable-line jsx-a11y/no-autofocus
            required
            onChange={this.handleChangeEmailaddress}
          />
          <label htmlFor="password">
            Password(*)
            {submitted && !password && (
              <div className="help-block">must be at least 6 characters</div>
            )}
          </label>
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
            Sign in
          </button>
        </form>
      </StartPage>
    );
  }
}

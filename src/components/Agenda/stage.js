import React from "react";
import styles from "./stage.scss";
import PropTypes from "prop-types";
import { Input } from "antd";
import { Menu, Dropdown } from "antd";

const { TextArea } = Input;

export default class Stage extends React.Component {
  static propTypes = {
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    title: PropTypes.string,
    location: PropTypes.string,
    widthDivisor: PropTypes.number,
    position: PropTypes.number
  };
  state = {
    value: ""
  };

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  render() {
    const { start, end, title, location, widthDivisor, position } = this.props;
    const { value, dropDown } = this.state;
    const stageStyle = {
      height: `${end - start}px`,
      top: `${start}px`,
      left: `${(100 / widthDivisor) * position}%`,
      width: `calc(${100 / widthDivisor}% - 8px`
    };
    const menu = (
      <Menu>
        <Menu.Item key="1">Ship</Menu.Item>
        <Menu.Item key="2">2nd </Menu.Item>
        <Menu.Item key="3">3rd </Menu.Item>
      </Menu>
    );

    return (
      <div style={stageStyle} className={styles.calendar__stage}>
        <Dropdown overlay={menu} trigger={["contextMenu"]}>
          <div className={styles.inputs}>
            <TextArea
              className={styles.calendar__stage__content__title}
              value={title || value}
              onChange={this.onChange}
              placeholder=""
              autosize={{ minRows: 3, maxRows: 3 }}
            />
          </div>
        </Dropdown>
      </div>
    );
  }
}

// Libs
import React, { Component } from "react";
import PropTypes from 'prop-types';
// Styles
import styles from "./item.scss";


export default class Item extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    paused: PropTypes.bool,
    item:PropTypes.object.isRequired,
    onDelete:PropTypes.func,
    onPause:PropTypes.func,
    onComplete:PropTypes.func,
    text:PropTypes.string
  };

  renderButtons() {
    if (!this.props.paused) {
      return (
        <div className={styles.buttons}>
          <button className={styles.delete} onClick={() => this.props.onDelete(this.props.item)}></button>
          <button className={styles.pause} onClick={() => this.props.onPause(this.props.item)}></button>
          <button className={styles.complete} onClick={() => this.props.onComplete(this.props.item)}></button>
        </div>
      );
    }
    return (
      <div className={styles.buttons}>
        <button className={styles.delete} onClick={() => this.props.onDelete(this.props.item)}></button>
        <button className={styles.complete} onClick={() => this.props.onComplete(this.props.item)}></button>
      </div>
      );
  }

  render() {
    return (
    <div className={styles.item}>
      <div className={styles.item-name}>{this.props.text}</div>
      {this.renderButtons()}
      </div>
    );
  }
}

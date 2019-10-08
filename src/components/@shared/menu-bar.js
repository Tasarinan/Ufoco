import React, { Component } from 'react';

import styles from './menu-bar.scss';
import { Button } from 'antd';
const { remote } =require('electron');
import NavMenu from './menu';


export default class MenuBar extends Component {


  minimize = () => {
    remote.getCurrentWindow().minimize();
  };

  close = () => {
    remote.getCurrentWindow().close();
  };


  render() {
    return (
      <div className={styles.menubar}>
        <NavMenu />
        <div className={styles.controls}>
          <Button icon= "minus" onClick = {this.minimize} onKeyPress={this.handleKeyPress} tabIndex="0"/>
          <Button icon="close" onClick = {this.close} onKeyPress={this.handleKeyPress} tabIndex="0"/>
        </div>
      </div>
    );
  }
}

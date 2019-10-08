import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer, remote } from 'electron';

import { Button, Icon, Menu, Popover } from 'antd';
import styles from './menu.scss';


export default class NavMenu extends Component{

  win = remote.getCurrentWindow();

  toggleFullscreen = () => {
    this.win.setFullScreen(!this.win.isFullScreen());
  };

  quit = () =>{
    this.win.close();
  };

  minimize = () =>{
    this.win.minimize();
  };

  render(){
    const content = (
      <Menu>
        <Menu.Item key="1" onClick = {this.quit}>

        <Icon type="close"/>
        <span>exit</span>
        </Menu.Item>

      </Menu>
    );

  return(
    <Popover placement="bottomLeft" content={content} trigger="click">
        <span className={styles.menu}>
        <Button icon="menu" onKeyPress={this.handleKeyPress} tabIndex="0"/>
        </span>
      </Popover>
  );
  }





}

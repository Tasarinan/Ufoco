// Libs
import React, { Component } from "react";

// Styles
import styles from "./Header.scss";

import MenuBar from './menu-bar';


/**
 * Header
 *
 * @class Header
 * @extends {Component}
 */
export default class Header extends Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (

     <div >
       <MenuBar />


    </div>);
  }
}


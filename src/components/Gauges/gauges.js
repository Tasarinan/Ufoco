import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Date from './today-date';
import styles from './gauges.scss';

export default class Gauges extends Component {

  constructor(props){
    super(props);
  }

  static propTypes = {


  };

  render(){
    return(
      <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.section}></div>

      </div>
      <div className={styles.right}>
        <div className={styles.date}>
          <Date />
        </div>


      </div>
    </div>
    );
  }


}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './steering.css';

export default class Steering extends Component {
  static propTypes = {
    hideaway: PropTypes.func.isRequired
  }

  render(){
    return(
      <React.Fragment>
      <button type="button" className={styles.button}  >
        Hideaway
      </button>
      <button type="button" className={styles.button}  >
        Break
      </button>
    </React.Fragment>
    )

  }


}

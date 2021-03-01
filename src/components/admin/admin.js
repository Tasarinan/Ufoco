import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import TitleBar from '../titlebar';
import Flowlets from '../flowlets';
import Editor from '../editor';
import { ON_CHANGE_WINDOW_SIZE } from '../../constants/ipc_channels';

export default class Admin extends Component {
  static propTypes = {};
  componentWillMount() {
    ipcRenderer.send(ON_CHANGE_WINDOW_SIZE);
  }
  render() {
    const { path } = this.props.match;
    return (
      <div className='admin'>
        <TitleBar />
        <Switch>
          <Route exact path={path} component={Flowlets} />
          <Route path={`${path}/edit/:id?`} component={Editor} />
        </Switch>
      </div>
    );
  }
}

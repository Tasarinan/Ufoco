import React, { PureComponent } from 'react';
import WindowControl from './windowControl';
import { Link } from 'react-router-dom';
export default class TitleBar extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <div className='title-bar'>
        <div className='title-bar-links'>
          <Link to={'/admin/'} className='title-bar-flowListIcon'></Link>
          <Link to={'/admin/taskList/'} className='title-bar-taskListIcon'></Link>

          <button>
            <Link to={'/admin/'}>
              <i className='ri-bar-chart-fill'></i>
            </Link>
          </button>
          <button>
            <Link to='/'>
              <i className='ri-timer-flash-line'></i>
            </Link>
          </button>
        </div>
        <div className='title-bar-traffic-light'></div>
        <div className='title-bar-searchInput'></div>
        <WindowControl />
      </div>
    );
  }
}

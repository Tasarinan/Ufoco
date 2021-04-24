import React, { PureComponent } from 'react';
// Styles
//import Tasklet from './tasklet';

export default class TaskList extends PureComponent {
  /**
   * this is constructor description.
   * @param {object} props passed to component
   */
  constructor(props) {
    super();
    // Used to stop after navigating away from this component.
    this.timer = 0;
  }
  /**
   * called when component is mounted.
   */
  componentWillMount() {
    this.autosave();
  }

  /**
   * called before un-mounting component.
   */
  componentWillUnmount() {
    // Stopping the timer
    clearInterval(this.timer);
  }

  /**
   * autosave elements
   */
  autosave() {
    this.timer = setInterval(() => {
      if (this.props.dirty) this.props.autoSaveDirtyData();
    }, 3000);
  }

  render() {
    const { tasklets } = this.props;
    return (
      <div className='tasklist'>
        <div className='section tasklist-plan'>
          <div className='tasklist-plan-menu '>
            <div className='tasklist-plan-date'>
              <strong>{new Date().toDateString()}</strong>
            </div>
            <div className='tasklist-plan-opcoes'>
              <h5>TASKS</h5>
            </div>
          </div>
        </div>
        <div className='section tasklist-backlogs'>B</div>
        <div className='section c'>C</div>
        <div className='section d'>D</div>
      </div>
    );
  }
}

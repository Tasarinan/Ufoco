import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
export default class Tasklet extends PureComponent {
  static propTypes = {
    content: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    flowletId: PropTypes.string.isRequired,
    isRecurring: PropTypes.bool.isRequired,
    rolledOver: PropTypes.bool.isRequired,
    isPriority: PropTypes.bool.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    hideComplete: PropTypes.bool.isRequired,
    isSuggested: PropTypes.bool.isRequired,
    priority: PropTypes.number.isRequired,
    suggested: PropTypes.number.isRequired,
    moveToToday: PropTypes.func.isRequired,
    moveToLater: PropTypes.func.isRequired,
    toggleComplete: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleFocusOut = this._handleFocusOut.bind(this);
  }

  _handleFocus(text) {
    console.log('editing: ' + text);
  }

  _handleFocusOut(text) {
    console.log('updated content: ' + text);
    // this.props.updateContent(this.props.task._id, text);
  }

  render() {
    const { id, hideComplete, isCompleted } = this.props;
    return (
      <div key={id}>
        <div className='tasklet'>
          <div className='optionBullet'>
            <div className='triangleUp'></div>
          </div>
        </div>
      </div>
    );
  }
}

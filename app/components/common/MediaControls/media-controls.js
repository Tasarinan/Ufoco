import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'antd';

import { hasReachedLastRound } from '../../../utils/countdown-timer.util';
import { isLongBreak } from '../../../utils/phases.util';

export default class MediaControls extends PureComponent {
  static propTypes = {
    compact: PropTypes.bool,
    currentRound: PropTypes.number.isRequired,
    currentPhase: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    totalRounds: PropTypes.number.isRequired,
    openGeneralAlert: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    resetTimer: PropTypes.func.isRequired,
    resume: PropTypes.func.isRequired,
    skip: PropTypes.func.isRequired,
  };

  componentWillMount() {
    window.addEventListener('keyup', this.onMediaControlKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onMediaControlKeyPress);
  }

  onMediaControlClick = () => {
    // NOTE: Clicking sets focus on the button which will cause
    // unexpected behavior because it will trigger both the key press
    // event and also the click event
    this.playBtn.buttonRef.blur();

    const { isPlaying, pause, resume } = this.props;
    if (isPlaying) pause();
    else resume();
  };

  onMediaControlKeyPress = e => {
    const { isPlaying, pause, resume } = this.props;
    if (e.key === ' ') {
      if (isPlaying) pause();
      else resume();
    }
  };

  openAlert = () => {
    const { openGeneralAlert, resetTimer } = this.props;
    openGeneralAlert(
      'Are you sure you want to redo the current phase?',
      resetTimer,
      { cancelText: 'Cancel' }
    );
  };

  render() {
    const {
      compact,
      currentPhase,
      currentRound,
      isPlaying,
      totalRounds,
      skip,
    } = this.props;

    const buttonStyles = classNames(
      'non-draggable',
      'pt-minimal',
      'btn-no-hover',
      'btn-no-bg',
      {
        'pt-large': !compact,
        'white-btn': compact && !isLongBreak(currentPhase),
        'black-btn': compact && isLongBreak(currentPhase)
      }
    );

    return (
      <section>
        <Button
          icon="redo"
          onClick={this.openAlert}
          className={buttonStyles}
        />
        <Button
          ref={p => { this.playBtn = p; }}
          active={isPlaying}
          icon={isPlaying ? 'pause' : 'play'}
          onClick={this.onMediaControlClick}
          className={classNames(buttonStyles, 'mx-3')}
        />
        <Button
          icon="step-forward"
          disabled={hasReachedLastRound(
            currentPhase,
            currentRound,
            totalRounds
          )}
          onClick={skip}
          className={buttonStyles}
        />
      </section>
    );
  }
}

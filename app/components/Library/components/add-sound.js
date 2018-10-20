import { remote } from 'electron';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, Dialog, Intent } from '@blueprintjs/core';

import { SoundTypes } from '../../../constants/AppSettings';

class AddSound extends PureComponent {
  static propTypes = {
    addSound: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  state = {
    isOpen: false,
    src: '',
    title: '',
    soundType: SoundTypes.TICK,
    hasSrc: null,
    hasTitle: null,
  };

  render() {
    const {
      addSound,
      className
    } = this.props;

    const {
      isOpen,
      src,
      title,
      soundType,
      hasSrc,
      hasTitle,
    } = this.state;

    return (
      <div className={className}>
        <Button
          className="pt-minimal btn-no-hover btn-no-bg"
          icon="upload"
          onClick={() => this.setState({ isOpen: true })}
        />

        <Dialog isOpen={isOpen} onClose={() => this.setState({ isOpen: false })}>
          <div className="mx-3 mt-3">
            <div
              role="button"
              tabIndex={0}
              className="pt-input-group mb-1"
              onClick={() => {
                const opts = {
                  filters: [
                    { name: 'Audio', extensions: ['flac', 'mp3', 'mp4', 'ogg', 'wav'] }
                  ]
                };
                remote.dialog.showOpenDialog(opts, filePaths => {
                  if (filePaths) this.setState({ src: filePaths[0], hasSrc: true });
                });
              }}
            >
              <span className="pt-icon pt-icon-music" />
              <input
                readOnly
                className={classNames('pt-input', {
                  'pt-intent-danger': hasSrc === false,
                  'pt-intent-success': hasSrc === true,
                })}
                type="text"
                placeholder="Browse files..."
                value={src}
                dir="auto"
              />
            </div>
            <div className="pt-input-group mb-3">
              <span className="pt-icon pt-icon-tag" />
              <input
                className={classNames('pt-input', {
                  'pt-intent-danger': hasTitle === false,
                  'pt-intent-success': hasTitle === true && title
                })}
                type="text"
                placeholder="Title"
                maxLength="75"
                dir="auto"
                value={title}
                onChange={e => this.setState({ title: e.target.value, hasTitle: true })}
              />
            </div>
            <Button
              className="float-right"
              icon="add"
              text="Add sound"
              intent={Intent.SUCCESS}
              onClick={() => {
                if (!title || !src) {
                  if (!title) this.setState({ hasTitle: false });
                  if (!src) this.setState({ hasSrc: false });
                  return;
                }

                addSound(title, src, soundType);
                this.setState({ title: '', src: '', hasTitle: null, hasSrc: null, isOpen: false });
              }}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default AddSound;

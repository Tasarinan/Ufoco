import React from 'react';
import ReactDOM from 'react-dom';

import { isMacOS } from 'utils/platform.util';

import MenuBar from '../../components/common/MenuBar';
import WelcomeSlides from './welcome-slides';

import '../../app.global.scss';
import './welcome-slides.scss';

class WelcomeScreen extends React.Component {
  render() {
    return (
      <main>
        {!isMacOS() && <MenuBar />}
        <WelcomeSlides />
      </main>
    );
  }
}

ReactDOM.render(<WelcomeScreen />, document.querySelector('#root'));

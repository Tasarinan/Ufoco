// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = React.createContext('light');

// Components

/**
 * App
 *
 * @class App
 * @extends {Component}
 */
export default class App extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { children, theme } = this.props;
    return (
      <ThemeContext.Provider value={theme}>
        {/* Everything below the "theme-*" div can be styled based on the theme */}
        <div className={`theme-${theme}`}>
          <div className='app'>{children}</div>
        </div>
      </ThemeContext.Provider>
    );
  }
}

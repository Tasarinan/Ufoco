'use strict'

require('../less/about.less')

import React from 'react'
import ReactDOM from 'react-dom'

import { addExternalLinks } from './link.js'

class AboutPanel extends React.Component {
    componentDidMount() {
        addExternalLinks()
    }
    render() {
        return (
            <div id="about">
        <div className='about-logo'>
          <img src="img/ufoco.png" height="72" />
        </div>
        <h1>To learn more about all features and about ways how you can help it, visit it's<a href="#" title="View  landing page">UFOCO 0.1.0</a></h1>
        <p>Focus on what you  matters and boost productivity  by creating perfect productive environment</p>
        <hr />
        <p>&copy; 2017 <a href="#" title="Know more about me">Nethead team</a></p>
        <p>Crafted with ❤ by Nethead</p>
        <p><a href="#" title="Write me an email">Write me a letter :-D</a></p>
        <div className="about-footer">
            latest version: <a href="https://github.com/hovancik/stretchly/releases" id="update">checking...</a>
        </div>
      </div>
        )
    }
}

ReactDOM.render(<AboutPanel />, document.getElementById('root'))
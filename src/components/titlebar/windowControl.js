import React, { PureComponent } from "react";
import { remote } from 'electron';

export default class WindowControl extends PureComponent {
  constructor(props){
    super(props)
    this.getCurrentWindow = this.getCurrentWindow.bind(this);
    this.minimizeWindow = this.minimizeWindow.bind(this);
    this.maxUnmaxWindow = this.maxUnmaxWindow.bind(this);
    this.closeWindow = this.closeWindow.bind(this);

    this.state = {
        isMaximized :false
    };
}

getCurrentWindow() {
    return remote.getCurrentWindow();
}
minimizeWindow(browserWindow = this.getCurrentWindow()) {
      browserWindow.minimize();
}
maxUnmaxWindow(browserWindow = this.getCurrentWindow()) {
    if (this.state.isMaximized) {
      browserWindow.unmaximize();
    } else {
      browserWindow.maximize();
    }
    this.setState({isMaximized: !this.state.isMaximized})
}
closeWindow(browserWindow = this.getCurrentWindow()) {
    browserWindow.close();
}

render(){
    return(
        <div className = "title-bar-WinControls">
            <div className="title-bar-icons title-bar-minimizeIcon" onClick={ () => { this.minimizeWindow() }}></div>
            <div className={"title-bar-icons " + (this.state.isMaximized ? "title-bar-restoreIcon" : "title-bar-maximizeIcon")} onClick={ () => { this.maxUnmaxWindow() }}></div>
            <div className="title-bar-icons title-bar-closeIcon" onClick={ () => {this.closeWindow()}}></div>
        </div>
    );
}
}

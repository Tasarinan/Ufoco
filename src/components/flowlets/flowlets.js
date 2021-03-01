import React, { PureComponent } from 'react';
// Styles
import Item from './item';

export default class Flowlets extends PureComponent {
  /**
   * this is constructor description.
   * @param {object} props passed to component
   */
  constructor(props) {
    super();
    // Used to stop after navigating away from this component.
    this.timer = 0;
    this.flatid = [];
    this.refs = null;
  }

  state = {
    cursor_pos: '',
  };

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

  focusNext(siblingId) {
    let index = this.flatid.indexOf(siblingId);
    if (index < this.flatid.length - 1) {
      while (index < this.flatid.length - 1) {
        index++;
        if (this.refs[this.flatid[index]].current !== null) {
          //set focus and scroll to view
          this.setState({ cursor_pos: this.flatid[index] });
          break;
        }
      }
    }
  }

  focusPrev(siblingId) {
    let index = this.flatid.indexOf(siblingId);
    if (index > 0) {
      while (index > 0) {
        index--;
        if (this.refs[this.flatid[index]].current !== null) {
          //set focus and scroll to view
          this.setState({ cursor_pos: this.flatid[index] });
          break;
        }
      }
    }
  }

  renderElements(idsToRender, elements) {
    const { cursor_pos } = this.state;
    const elementsToRender = [];
    idsToRender.forEach((eleId) => {
      const element = elements.find((element) => element.id === eleId);
      if (element !== undefined) {
        this.flatid.push(element.id);
        elementsToRender.push(
          <Item
            {...this.props}
            key={element.id}
            ref={this.refs[element.id]}
            name={element.name}
            id={element.id}
            parentId={element.parentId}
            collapsed={element.collapsed}
            completed={element.completed}
            toggleItemCollapse={this.props.toggleItemCollapse}
            toggleItemComplete={this.props.toggleItemComplete}
            changeItemName={this.props.changeItemName}
            addItem={this.props.addItem}
            deleteItem={this.props.deleteItem}
            addItemToParent={this.props.addItemToParent}
            focusNext={this.focusNext.bind(this)}
            focusPrev={this.focusPrev.bind(this)}
            onFocus={cursor_pos === element.id ? true : false}
          >
            {element.children.length ? this.renderElements(element.children, elements) : null}
          </Item>
        );
      }
    });
    return <ul>{elementsToRender}</ul>;
  }

  render() {
    const { elements } = this.props;
    this.flatid = [];
    this.refs = elements.reduce((acc, value) => {
      acc[value.id] = React.createRef();
      return acc;
    }, {});
    /* const rootElementsIds = elements
      .filter((element) => element.parentId === "")
      .map((element) => element.id);*/
    const rootElement = elements.find((element) => element.id === 'root');
    // if (rootElement.children.length === 0) this.props.addItem();
    return (
      <div className='flowlets'>
        {elements.length ? this.renderElements(rootElement.children, elements) : null}
      </div>
    );
  }
}

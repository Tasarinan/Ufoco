import React, { PureComponent } from "react";
// Styles
import Item from "./item";

export default class Mindflow extends PureComponent {
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

  renderElements(idsToRender, elements) {
    const elementsToRender = [];
    idsToRender.forEach((eleId) => {
      const element = elements.find((element) => element.id === eleId);
      if (element !== undefined) {
        elementsToRender.push(
          <Item
            {...this.props}
            key={element.id}
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
          >
            {element.children.length
              ? this.renderElements(element.children, elements)
              : null}
          </Item>
        );
      }
    });
    return <ul>{elementsToRender}</ul>;
  }

  render() {
    const { elements } = this.props;
    /* const rootElementsIds = elements
      .filter((element) => element.parentId === "")
      .map((element) => element.id);*/
    const rootElement = elements.find((element) => element.id === "root");
    // if (rootElement.children.length === 0) this.props.addItem();
    return (
      <div className="mindflow">
        {elements.length
          ? this.renderElements(rootElement.children, elements)
          : null}
      </div>
    );
  }
}

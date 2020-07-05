import React, { PureComponent } from "react";
// Styles
import Item from "./item";
import TopBar from "../topbar";
// Styles
import styles from "./bufl.scss";
export default class List extends PureComponent {
  generate(data) {
    const children = (items) => {
      if (items) {
        return <ul>{this.generate(items)}</ul>;
      }
    };

    return data.map((node) => {
      return (
        <Item
          key={node.id}
          name={node.name}
          id={node.id}
          collapsed={node.collapsed}
          completed={node.completed}
          toggleCollapseElm={this.props.toggleCollapseElm}
          toggleCompleteElm={this.props.toggleCompleteElm}
          changeElmName={this.props.changeElmName}
          addNode={this.props.addNode}
          addChild={this.props.addChild}
          addToParent={this.props.addToParent}
          deleteNode={this.props.deleteNode}
        >
          {children(node.items)}
        </Item>
      );
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <TopBar />
        <div className={styles.list}>
          <ul>{this.generate(this.props.data)}</ul>
        </div>
      </div>
    );
  }
}

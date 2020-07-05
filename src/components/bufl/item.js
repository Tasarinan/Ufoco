import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
// Styles
import styles from "./bufl.scss";

export default class Item extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    collapsed: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
    toggleCollapseElm: PropTypes.func.isRequired,
    toggleCompleteElm: PropTypes.func.isRequired,
    changeElmName: PropTypes.func.isRequired,
    addNode: PropTypes.func.isRequired,
    addChild: PropTypes.func.isRequired,
    addToParent: PropTypes.func.isRequired,
    deleteNode: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      collapsed: this.props.collapsed,
    };
    this.handleToggleCollapse = this.handleToggleCollapse.bind(this);
    this.handleMarkCompleted = this.handleMarkCompleted.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleDeleted = this.handleDeleted.bind(this);
  }

  handleToggleCollapse = () => {
    this.setState(
      (prev) => ({ collapsed: !prev.collapsed }),
      () => {
        this.props.toggleCollapseElm(this.props.id);
      }
    );
  };
  handleMarkCompleted = () => {
    this.props.toggleCompleteElm(this.props.id);
  };
  handleWhichKey = (e) => {
    if (e.key === "Enter") {
      //prevents adding a <br> and calls the action
      e.preventDefault();
      this.props.addNode(this.props.id);
    } else if (e.key === "Tab") {
      // create a child when pressing Tab on item
      e.preventDefault();
      this.props.addChild(this.props.id);
    } else if (e.key === "Backspace") {
      // deletes item when pressing Backspace on empty item
      if (e.currentTarget.textContent === "") {
        this.props.deleteNode(this.props.id);
      }
    } else if (e.shiftKey && e.key === "Tab") {
      // create a child when pressing Tab on item
      e.preventDefault();
      this.props.addToParent(this.props.id);
    }
  };
  handleChangeName = (e) => {
    const name = e.target.value;
    this.props.changeElmName(this.props.id, name);
  };
  handleDeleted = (e) => {};
  render() {
    const { collapsed } = this.state;
    const collapsedClass = cx(styles.minimize, {
      [styles.vhide]: !this.props.children,
    });
    const completedClass = cx({
      [styles.lineThrough]: this.props.completed,
    });
    const inputClass = cx({
      [styles.bold]: this.props.children,
      [styles.lineThrough]: this.props.completed,
    });
    const dropdownMenuClass = cx(styles.options, styles.dropdownMenu);
    return (
      <li>
        <div id="fadeIn">
          <div className={styles.optionButtons}>
            <div className={collapsedClass} onClick={this.handleToggleCollapse}>
              {collapsed ? "+" : "-"}
            </div>
            <div className={styles.optionBullet}>
              <div className={styles.triangleUp}></div>
              <ul className={dropdownMenuClass}>
                <li
                  onClick={this.handleMarkCompleted}
                  className={completedClass}
                >
                  Complete
                </li>
                <li onClick={this.duplicate}>Duplicate</li>
                <li onClick={this.handleDeleted}>Delete</li>
                <li>MoveUp</li>
                <li>MoveDown</li>
              </ul>
            </div>
          </div>
          <input
            type="text"
            className={inputClass}
            value={this.props.name}
            onKeyDown={this.handleWhichKey}
            onChange={this.handleChangeName}
          />
          <hr />
          {(() => {
            //Collapsable children
            if (collapsed === false) {
              return this.props.children;
            }
          })()}
        </div>
      </li>
    );
  }
}

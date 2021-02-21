import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Link } from "react-router-dom";
export default class Item extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    collapsed: PropTypes.bool.isRequired,
    completed: PropTypes.bool.isRequired,
    toggleItemComplete: PropTypes.func.isRequired,
    toggleItemCollapse: PropTypes.func.isRequired,
    changeItemName: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    insertItem: PropTypes.func.isRequired,
    indentItem: PropTypes.func.isRequired,
    outdentItem: PropTypes.func.isRequired,
    moveUpItem: PropTypes.func.isRequired,
    moveDownItem: PropTypes.func.isRequired,
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
    this.handleMoveUp = this.handleMoveUp.bind(this);
    this.handleMoveDown = this.handleMoveDown.bind(this);
  }

  handleToggleCollapse = () => {
    this.setState(
      (prev) => ({ collapsed: !prev.collapsed }),
      () => {
        this.props.toggleItemCollapse(this.props.id);
      }
    );
  };
  handleMarkCompleted = () => {
    this.props.toggleItemComplete(this.props.id);
  };
  handleWhichKey = (e) => {
    if (e.key === "Enter") {
      //prevents adding a <br> and calls the action
      e.preventDefault();
      this.props.insertItem(this.props.parentId, this.props.id);
    } else if (e.key === "Tab") {
      // create a child when pressing Tab on item
      e.preventDefault();
      this.props.indentItem(this.props.parentId, this.props.id);
    } else if (e.key === "Backspace") {
      // deletes item when pressing Backspace on empty item
      if (e.target.value === "") {
        this.props.deleteItem(this.props.id, this.props.parentId);
      }
    } else if (e.shiftKey && e.key === "Tab") {
      // create a child when pressing Tab on item
      e.preventDefault();
      this.props.outdentItem(this.props.parentId, this.props.id);
    } else if (e.key === 40) {
      e.preventDefault();
      //  $scope.focusNext(siblingId);
    }
    //down arrow
    else if (e.key === 38) {
      e.preventDefault();
      //$scope.focusPrev(siblingId);
    }
    //up arrow
    else return false;
  };
  handleChangeName = (e) => {
    const name = e.target.value;
    this.props.changeItemName(this.props.id, name);
  };
  handleDeleted = (e) => {
    this.props.deleteItem(this.props.parentId, this.props.id);
  };
  handleMoveUp = (e) => {
    this.props.moveUpItem(this.props.parentId, this.props.id);
  };
  handleMoveDown = (e) => {
    this.props.moveDownItem(this.props.parentId, this.props.id);
  };
  render() {
    const { collapsed } = this.state;
    const collapsedClass = cx("minimize", {
      ["vhide"]: !this.props.children,
    });
    const completedClass = cx({
      ["lineThrough"]: this.props.completed,
    });
    const inputClass = cx({
      ["bold"]: this.props.children,
      ["lineThrough"]: this.props.completed,
    });
    const dropdownMenuClass = cx("options", "dropdownMenu");
    return (
      <li>
        <div id="fadeIn">
          <div className="option-buttons">
            <div className={collapsedClass} onClick={this.handleToggleCollapse}>
              {collapsed ? "+" : "-"}
            </div>
            <div className="optionBullet">
              <div className="triangleUp"></div>
              <ul className={dropdownMenuClass}>
                <li
                  onClick={this.handleMarkCompleted}
                  className={completedClass}
                >
                  Complete
                </li>
                <li>
                  <Link to={`/admin/edit/${this.props.id}`}>Edit</Link>
                </li>
                <li onClick={this.handleDeleted}>Delete</li>
                <li onClick={this.handleMoveUp}>MoveUp</li>
                <li onClick={this.handleMoveDown}>MoveDown</li>
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
          <br />
        </div>
        <hr />
        {(() => {
          //Collapsable children
          if (collapsed === false) {
            return this.props.children;
          }
        })()}
      </li>
    );
  }
}

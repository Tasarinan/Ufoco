import React, { PureComponent } from "react";
import { RichUtils } from "draft-js";
import PropTypes from "prop-types";
import cx from "classnames";

const STROKE_WIDTH_DEFAULT = 2;
const STROKE_WIDTH_SELECTED = 3;

export default class FormattingButtons extends PureComponent {
  static propTypes = {
    textEditorState: PropTypes.object.isRequired,
    onTextChange: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.onBoldClick = this.onBoldClick.bind(this);
    this.onItalicClick = this.onItalicClick.bind(this);
    this.onUlClick = this.onUlClick.bind(this);
    this.onOlClick = this.onOlClick.bind(this);
  }

  onBoldClick() {
    this.props.onTextChange(
      RichUtils.toggleInlineStyle(this.props.textEditorState, "BOLD")
    );
  }
  onItalicClick() {
    this.props.onTextChange(
      RichUtils.toggleInlineStyle(this.props.textEditorState, "ITALIC")
    );
  }
  onOlClick() {
    this.props.onTextChange(
      RichUtils.toggleBlockType(this.props.textEditorState, "ordered-list-item")
    );
  }
  onUlClick() {
    this.props.onTextChange(
      RichUtils.toggleBlockType(
        this.props.textEditorState,
        "unordered-list-item"
      )
    );
  }

  render() {
    // Detect active inline/block styles
    const inlineStyle = this.props.textEditorState.getCurrentInlineStyle();
    const blockType = RichUtils.getCurrentBlockType(this.props.textEditorState);
    const isBold = inlineStyle.has("BOLD");
    const isItalic = inlineStyle.has("ITALIC");
    const isOl = blockType === "ordered-list-item";
    const isUl = blockType === "unordered-list-item";
    const strokeWidthClass = cx({
      ["lineThrough"]: isBold,
    });
    return (
      <div className="formatting-buttons">
        <button
          type="button"
          className={`button button-invisible ${isBold ? "button-active" : ""}`}
          onClick={this.onBoldClick}
        >
          <i className="ri-bold" title="Bold"></i>
        </button>
        <button
          type="button"
          className={`button button-invisible ${
            isItalic ? "button-active" : ""
          }`}
          onClick={this.onItalicClick}
        >
          <i className="ri-italic" title="Italic"></i>
        </button>
        <button
          type="button"
          className={`button button-invisible ${isUl ? "button-active" : ""}`}
          onClick={this.onUlClick}
        >
          <i className="ri-list-unordered" title="unordered-list-item"></i>
        </button>
        <button
          type="button"
          className={`button button-invisible ${isOl ? "button-active" : ""}`}
          onClick={this.onOlClick}
        >
          <i className="ri-list-ordered" title="ordered-list-item"></i>
        </button>
      </div>
    );
  }
}

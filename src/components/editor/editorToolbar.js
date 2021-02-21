import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import FormattingButtons from "./formattingButtons";
export default class EditorToolbar extends PureComponent {
  static propTypes = {
    textEditorState: PropTypes.object.isRequired,
    onTextChange: PropTypes.func.isRequired,
  };
  render() {
    return (
      <div
        className="editor-toolbar"
        onMouseDown={(e) => {
          e.preventDefault(); // Keep focus on editor when a button is clicked
        }}
        role="none"
      >
        <FormattingButtons
          onTextChange={this.props.onTextChange}
          textEditorState={this.props.textEditorState}
        />
      </div>
    );
  }
}

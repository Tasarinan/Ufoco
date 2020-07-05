import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  DraftEditorCommand,
  DraftHandleValue,
  EditorState,
  getDefaultKeyBinding,
  RichUtils,
} from "draft-js";
import createListPlugin from "draft-js-list-plugin";
import PluginEditor from "draft-js-plugins-editor";
import debounce from "lodash.debounce";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import { getUpdateDate, toLocaleWeekday } from "../../utils/date.util";
import React, { KeyboardEvent, PureComponent, ReactNode } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
// Styles
import styles from "./editor.scss";
const AUTOSAVE_INTERVAL = 500;
// Draft.js plugins
const listPlugin = createListPlugin();
const plugins = [listPlugin];

export default class Editor extends PureComponent {
  static propTypes = {
    enableSpellcheck: PropTypes.bool.isRequired,
    hideTitles: PropTypes.bool.isRequired,
    guidSelected: PropTypes.string.isRequired,
    entry: PropTypes.object.isRequired,
    updateEntry: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      guidSelected: this.props.guidSelected,
      textEditorState: EditorState.createWithContent(
        convertFromRaw(markdownToDraft(this.props.entry.text))
      ),
      titleEditorState: EditorState.createWithContent(
        ContentState.createFromText(this.props.entry.title)
      ),
    };
  }
  componentDidMount = () => {
    // Save entry before app is closed
    window.addEventListener("unload", this.saveEntry);
  };
  componentWillUnmount = () => {
    window.removeEventListener("unload", this.saveEntry);
  };

  handleTextKeyCommand = (command, editorState) => {
    let newState;
    if (command === "bold") {
      newState = RichUtils.toggleInlineStyle(editorState, "BOLD");
    } else if (command === "italic") {
      newState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
    } else {
      return "not-handled";
    }
    this.onTextChange(newState);
    return "handled";
  };
  onTextChange = (textEditorState) => {
    this.setState({
      textEditorState,
    });
    this.saveEntryDebounced();
  };
  handleTitleKeyCommand = (command) => {
    // Move focus to text editor when enter key is pressed in title editor
    if (command === "enter") {
      this.textEditor.focus();
      return "handled";
    }
    return "not-handled";
  };

  onTitleChange = (titleEditorState) => {
    this.setState({
      titleEditorState,
    });
    this.saveEntryDebounced();
  };

  saveEntry = () => {
    const { guidSelected, updateEntry } = this.props;
    const { textEditorState, titleEditorState } = this.state;

    const title = titleEditorState.getCurrentContent().getPlainText();
    const text = draftToMarkdown(
      convertToRaw(textEditorState.getCurrentContent())
    );
    updateEntry(guidSelected, title.trim(), text.trim());
  };

  // eslint-disable-next-line react/sort-comp
  saveEntryDebounced = debounce(this.saveEntry.bind(this), AUTOSAVE_INTERVAL);

  render() {
    const { textEditorState, titleEditorState } = this.state;
    const { enableSpellcheck, hideTitles } = this.props;
    // Detect active inline/block styles
    const blockType = RichUtils.getCurrentBlockType(textEditorState);
    const isOl = blockType === "ordered-list-item";
    const isUl = blockType === "unordered-list-item";
    const weekdayDate = toLocaleWeekday(getUpdateDate());
    return (
      <form className={styles.editor}>
        <div className={styles.editorScrollable}>
          <p className={styles.textfaded}>{weekdayDate}</p>
          {!hideTitles && (
            <div className={styles.editorTitleWrapper}>
              <PluginEditor
                editorState={titleEditorState}
                handleKeyCommand={this.handleTitleKeyCommand}
                keyBindingFn={Editor.titleKeyBindingFn}
                onBlur={this.saveEntry}
                onChange={this.onTitleChange}
                placeholder="add-a-title"
                spellCheck={enableSpellcheck}
              />
            </div>
          )}
          <div className={styles.editorTextWrapper}>
            <PluginEditor
              editorState={textEditorState}
              handleKeyCommand={this.handleTextKeyCommand}
              onBlur={this.saveEntry}
              onChange={this.onTextChange}
              ref={(textEditor) => {
                this.textEditor = textEditor;
              }}
              placeholder={""}
              plugins={plugins}
              spellCheck={enableSpellcheck}
            />
          </div>
        </div>
      </form>
    );
  }
}

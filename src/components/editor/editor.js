import React, { PureComponent } from 'react';
import { ContentState, convertFromRaw, convertToRaw, EditorState, RichUtils } from 'draft-js';
import Editor, { createEditorStateWithText, composeDecorators } from '@draft-js-plugins/editor';
import createLinkPlugin from '@draft-js-plugins/anchor';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import createImagePlugin from '@draft-js-plugins/image';
import createFocusPlugin from '@draft-js-plugins/focus';
import createAlignmentPlugin from '@draft-js-plugins/alignment';
import createVideoPlugin from '@draft-js-plugins/video';
import createBlockDndPlugin from '@draft-js-plugins/drag-n-drop';
import createDragNDropUploadPlugin from '@draft-js-plugins/drag-n-drop-upload';
import createResizeablePlugin from '@draft-js-plugins/resizeable';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
} from '@draft-js-plugins/buttons';

import debounce from 'lodash.debounce';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { getUpdateDate, toLocaleWeekday } from '../../utils/date.util';

import PropTypes from 'prop-types';
const AUTOSAVE_INTERVAL = 500;

import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import '@draft-js-plugins/anchor/lib/plugin.css';
import '@draft-js-plugins/alignment/lib/plugin.css';
import '@draft-js-plugins/image/lib/plugin.css';
import MockUpload from './MockUpload';

export default class MdEditor extends PureComponent {
  static propTypes = {
    enableSpellcheck: PropTypes.bool.isRequired,
    hideHeadline: PropTypes.bool.isRequired,
    note: PropTypes.object.isRequired,
    fetchDetail: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      textEditorState: EditorState.createWithContent(
        convertFromRaw(markdownToDraft(this.props.note.body || ''))
      ),
      titleEditorState: EditorState.createWithContent(
        ContentState.createFromText(this.props.note.headline || '')
      ),
    };
    const resizeablePlugin = createResizeablePlugin();
    const alignmentPlugin = createAlignmentPlugin();
    const focusPlugin = createFocusPlugin();
    const blockDndPlugin = createBlockDndPlugin();

    const linkPlugin = createLinkPlugin({
      placeholder: 'https://…',
      linkTarget: '_blank',
    });

    const decorators = composeDecorators(
      resizeablePlugin.decorator,
      alignmentPlugin.decorator,
      focusPlugin.decorator,
      blockDndPlugin.decorator
    );
    const videoPlugin = createVideoPlugin(decorators);
    const imagePlugin = createImagePlugin(decorators);
    const toolbarPlugin = createToolbarPlugin();

    const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
      handleUpload: MockUpload,
      addImage: imagePlugin.addImage,
    });

    this.PluginComponents = {
      Toolbar: toolbarPlugin.Toolbar,
      LinkButton: linkPlugin.LinkButton,
      AddImage: imagePlugin.addImage,
      AddVideo: videoPlugin.addVideo,
      AlignmentTool: alignmentPlugin.AlignmentTool,
    };

    this.plugins = [
      toolbarPlugin,
      linkPlugin,
      alignmentPlugin,
      focusPlugin,
      resizeablePlugin,

      dragNDropFileUploadPlugin,
      blockDndPlugin,

      imagePlugin,
      videoPlugin,
    ];
    this.onFocus = this.onFocus.bind(this);
  }
  componentDidMount = () => {
    const { id } = this.props.match.params;
    console.log(id);
    this.props.fetchDetail(id);
    // Save entry before app is closed
    window.addEventListener('unload', this.saveEntry);
  };
  componentWillUnmount = () => {
    window.removeEventListener('unload', this.saveEntry);
  };

  handleTextKeyCommand = (command, editorState) => {
    let newState;
    if (command === 'bold') {
      newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
    } else if (command === 'italic') {
      newState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
    } else {
      return 'not-handled';
    }
    this.onTextChange(newState);
    return 'handled';
  };
  onTextChange = (textEditorState) => {
    this.setState({
      textEditorState,
    });
    this.saveEntryDebounced();
  };
  handleTitleKeyCommand = (command) => {
    // Move focus to text editor when enter key is pressed in title editor
    if (command === 'enter') {
      this.textEditor.focus();
      return 'handled';
    }
    return 'not-handled';
  };

  onTitleChange = (titleEditorState) => {
    this.setState({
      titleEditorState,
    });
    this.saveEntryDebounced();
  };
  onFocus = (e) => {
    if (e.target.className === 'DraftEditor-root') {
      this.editor.focus();
    }
  };

  saveEntry = () => {
    //  const { guidSelected, updateEntry } = this.props;
    const { textEditorState, titleEditorState } = this.state;

    const title = titleEditorState.getCurrentContent().getPlainText();
    const text = draftToMarkdown(convertToRaw(textEditorState.getCurrentContent()));
    //  updateEntry(guidSelected, title.trim(), text.trim());
  };

  // eslint-disable-next-line react/sort-comp
  saveEntryDebounced = debounce(this.saveEntry.bind(this), AUTOSAVE_INTERVAL);

  render() {
    const { textEditorState, titleEditorState } = this.state;
    const { enableSpellcheck, hideHeadline } = this.props;
    const { Toolbar, LinkButton, AddImage, AddVideo, AlignmentTool } = this.PluginComponents;

    // Detect active inline/block styles
    const blockType = RichUtils.getCurrentBlockType(textEditorState);
    const isOl = blockType === 'ordered-list-item';
    const isUl = blockType === 'unordered-list-item';
    const weekdayDate = toLocaleWeekday(getUpdateDate());
    return (
      <form className='editor'>
        <Toolbar className='editor-toolbar'>
          {(externalProps) => {
            return (
              <React.Fragment>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <CodeButton {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <LinkButton {...externalProps} />

                <AlignmentTool {...externalProps} />
              </React.Fragment>
            );
          }}
        </Toolbar>
        <div className='editor-scrollable'>
          <p className='text-faded'>{weekdayDate}</p>
          {!hideHeadline && (
            <div className='editor-title-wrapper'>
              <Editor
                editorState={titleEditorState}
                handleKeyCommand={this.handleTitleKeyCommand}
                keyBindingFn={Editor.titleKeyBindingFn}
                onBlur={this.saveEntry}
                onChange={this.onTitleChange}
                placeholder='add-a-title'
                spellCheck={enableSpellcheck}
                ref={(element) => {
                  this.editor = element;
                }}
              />
            </div>
          )}
          <div className='editor-text-wrapper'>
            <Editor
              editorState={textEditorState}
              handleKeyCommand={this.handleTextKeyCommand}
              onBlur={this.saveEntry}
              onChange={this.onTextChange}
              ref={(textEditor) => {
                this.textEditor = textEditor;
              }}
              placeholder={'write-something…'}
              plugins={this.plugins}
              spellCheck={enableSpellcheck}
            />
          </div>
        </div>
      </form>
    );
  }
}

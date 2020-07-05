import Editor from "./editor";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  enableSpellcheck: state.editor.enableSpellcheck,
  hideTitles: state.editor.hideTitles,
  guidSelected: state.editor.guidSelected,
  entry: state.editor.entry,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);

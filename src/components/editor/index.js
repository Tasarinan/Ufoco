import MdEditor from './editor';
import { connect } from 'react-redux';
import { fetchDetail } from '../../actions/editor_action';
const mapStateToProps = (state) => ({
  enableSpellcheck: state.editor.enableSpellcheck,
  hideHeadline: state.editor.hideHeadline,
  note: state.editor.note,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDetail: (id) => dispatch(fetchDetail(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MdEditor);

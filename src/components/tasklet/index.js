import TaskList from './taskList';
import { connect } from 'react-redux';
import {} from '../../actions/item_action';
import { autoSaveDirtyData } from '../../actions/file_action';

const mapStateToProps = (state) => ({
  tasklets: state.task.tasklets,
  dirty: state.task.dirty,
});

const mapDispatchToProps = (dispatch) => ({
  autoSaveDirtyData: () => dispatch(autoSaveDirtyData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);

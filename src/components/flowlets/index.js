import Flowlets from './flowlets';
import { connect } from 'react-redux';
import {
  toggleItemCollapse,
  toggleItemComplete,
  changeItemName,
  deleteItem,
  insertItem,
  indentItem,
  outdentItem,
  moveUpItem,
  moveDownItem,
} from '../../actions/item_action';
import { autoSaveDirtyData } from '../../actions/file_action';

const mapStateToProps = (state) => ({
  elements: state.item.elements,
  dirty: state.item.dirty,
});

const mapDispatchToProps = (dispatch) => ({
  toggleItemCollapse: (id) => dispatch(toggleItemCollapse(id)),
  toggleItemComplete: (id) => dispatch(toggleItemComplete(id)),
  changeItemName: (id, name) => dispatch(changeItemName(id, name)),
  insertItem: (parentId, id) => dispatch(insertItem(parentId, id)),
  deleteItem: (parentId, id) => dispatch(deleteItem(parentId, id)),
  indentItem: (parentId, id) => dispatch(indentItem(parentId, id)),
  outdentItem: (parentId, id) => dispatch(outdentItem(parentId, id)),
  moveUpItem: (parentId, id) => dispatch(moveUpItem(parentId, id)),
  moveDownItem: (parentId, id) => dispatch(moveDownItem(parentId, id)),
  autoSaveDirtyData: () => dispatch(autoSaveDirtyData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Flowlets);

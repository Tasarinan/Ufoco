import List from "./list";
import { connect } from "react-redux";
import {
  toggleCollapseElm,
  toggleCompleteElm,
  changeElmName,
  addNode,
  addChild,
  addToParent,
  deleteNode,
} from "../../actions/bufl_action";

const mapStateToProps = (state) => ({
  data: state.bufl.elements,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCollapseElm: (id) => dispatch(toggleCollapseElm(id)),
  toggleCompleteElm: (id) => dispatch(toggleCompleteElm(id)),
  changeElmName: (id, name) => dispatch(changeElmName(id, name)),
  addNode: (id) => dispatch(addNode(id)),
  addChild: (id) => dispatch(addChild(id)),
  addToParent: (id) => dispatch(addToParent(id)),
  deleteNode: (id) => dispatch(deleteNode(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);

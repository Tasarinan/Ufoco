import {
  ITEM_MOVEUP,
  ITEM_MOVEDOWN,
  ITEM_INSERT,
  ITEM_DELETE,
  ITEM_OUTDENT,
  ITEM_INDENT,
  ITEM_CHANGENAME,
  ITEM_TOGGLE_COLLAPSE,
  ITEM_TOGGLE_COMPLETE,
} from "../constants/action_types";
//import { guidGenerator } from "../utils/uuid.util";

export const toggleItemComplete = (id) => {
  return {
    type: ITEM_TOGGLE_COMPLETE,
    payload: {
      id: id,
    },
  };
};
export const toggleItemCollapse = (id) => {
  return {
    type: ITEM_TOGGLE_COLLAPSE,
    payload: {
      id: id,
    },
  };
};
export const changeItemName = (id, name) => {
  return {
    type: ITEM_CHANGENAME,
    payload: {
      name: name,
      id: id,
    },
  };
};

export const moveUpItem = (parentId, id) => {
  return {
    type: ITEM_MOVEUP,
    payload: {
      parentId: parentId,
      id: id,
    },
  };
};

export const moveDownItem = (parentId, id) => {
  return {
    type: ITEM_MOVEDOWN,
    payload: {
      parentId: parentId,
      id: id,
    },
  };
};

export const deleteItem = (parentId, id) => {
  return {
    type: ITEM_DELETE,
    payload: {
      parentId: parentId,
      id: id,
    },
  };
};

export const insertItem = (parentId, id) => {
  return {
    type: ITEM_INSERT,
    payload: {
      parentId: parentId,
      id: id,
    },
  };
};

export const outdentItem = (parentId, id) => {
  if (parentId === "") return;
  return {
    type: ITEM_OUTDENT,
    payload: {
      elemId: id,
      parentId: parentId,
    },
  };
};

export const indentItem = (parentId, id) => {
  if (parentId === "") return;
  return {
    type: ITEM_INDENT,
    payload: {
      elemId: id,
      parentId: parentId,
    },
  };
};

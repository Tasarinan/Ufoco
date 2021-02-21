import {
  ITEM_INSERT,
  ITEM_OUTDENT,
  ITEM_INDENT,
  ITEM_DELETE,
  ITEM_CHANGENAME,
  ITEM_MOVEUP,
  ITEM_MOVEDOWN,
  ITEM_TOGGLE_COLLAPSE,
  ITEM_TOGGLE_COMPLETE,
  LOAD_FILE_TO_ELES,
  SAVE_ELES_TO_FILE,
} from "../constants/action_types";
import {
  insertAt,
  generateTemplate,
  generateFirstChild,
  zIndexDown,
  zIndexUp,
} from "../utils/elem.util";

const initialState = {
  elements: [],
  dirty: false,
};
export default (state = initialState, action) => {
  const { elements } = state;
  switch (action.type) {
    case LOAD_FILE_TO_ELES: {
      const newEles = action.payload.elements;
      generateFirstChild(newEles);
      return {
        ...state,
        elements: newEles,
        dirty: false,
      };
    }
    case SAVE_ELES_TO_FILE:
      return {
        ...state,
        dirty: false,
      };
    case ITEM_MOVEDOWN: {
      let tempParentElem = elements.find(
        (element) => element.id == action.payload.parentId
      );
      if (tempParentElem.length === 1) return state;

      const updateElems = elements.map((element) => {
        if (element.id == action.payload.parentId) {
          return {
            ...element,
            children: zIndexDown(element.children, action.payload.id),
          };
        } else {
          return element;
        }
      });
      return { ...state, elements: updateElems, dirty: true };
    }
    case ITEM_MOVEUP: {
      const tempParentElem = elements.find(
        (element) => element.id == action.payload.parentId
      );
      if (tempParentElem.length === 1) return state;
      const updateElems = elements.map((element) => {
        if (element.id == action.payload.parentId) {
          return {
            ...element,
            children: zIndexUp(element.children, action.payload.id),
          };
        } else {
          return element;
        }
      });
      return { ...state, elements: updateElems, dirty: true };
    }
    case ITEM_CHANGENAME: {
      const updateElems = elements.map((element) => {
        if (element.id == action.payload.id) {
          return {
            ...element,
            name: action.payload.name,
          };
        } else {
          return element;
        }
      });
      return { ...state, elements: updateElems, dirty: true };
    }

    case ITEM_TOGGLE_COLLAPSE: {
      const updateElems = elements.map((element) => {
        if (element.id == action.payload.id) {
          return {
            ...element,
            collapsed: !element.collapsed,
          };
        } else {
          return element;
        }
      });
      return { ...state, elements: updateElems, dirty: true };
    }
    case ITEM_TOGGLE_COMPLETE: {
      const updateElems = elements.map((element) => {
        if (element.id == action.payload.id) {
          return {
            ...element,
            completed: !element.completed,
          };
        } else {
          return element;
        }
      });
      return { ...state, elements: updateElems, dirty: true };
    }
    case ITEM_INSERT: {
      const newAddEle = generateTemplate(action.payload.parentId);
      const newEles = elements.map((element) => {
        if (element.id == action.payload.parentId) {
          insertAt(element.children, action.payload.id, newAddEle.id);
          return {
            ...element,
          };
        } else {
          return element;
        }
      });
      insertAt(
        newEles,
        elements.find((element) => element.id == action.payload.id),
        newAddEle
      );
      return { ...state, elements: newEles, dirty: true };
    }
    case ITEM_DELETE: {
      let tempElem = elements.find(
        (element) => element.id == action.payload.id
      );
      //if not leaf, dont delete.
      if (tempElem.children.length != 0) return state;

      const updateElems = elements
        .filter((element) => action.payload.id.indexOf(element.id) == -1)
        .map((element) => {
          if (element.id == action.payload.parentId) {
            return {
              ...element,
              children: element.children.filter(
                (child) => child != action.payload.id
              ),
            };
          }
          return element;
        });
      generateFirstChild(updateElems);
      return { ...state, elements: updateElems, dirty: true };
    }
    case ITEM_OUTDENT: {
      let tempElem = elements.find(
        (element) => element.id == action.payload.elemId
      );
      // if it is top level elem, dont tab
      if (action.payload.parentId === "root") return state;
      let tempParentElem = elements.find(
        (element) => element.id == action.payload.parentId
      );
      tempElem.parentId = tempParentElem.parentId;
      const updateElems = elements
        .filter((element) => action.payload.elemId.indexOf(element.id) == -1)
        .map((element) => {
          if (element.id == action.payload.parentId) {
            return {
              ...element,
              children: element.children.filter(
                (child) => child !== action.payload.elemId
              ),
            };
          }
          return element;
        });
      const newEles = updateElems.map((element) => {
        if (element.id == tempParentElem.parentId) {
          insertAt(element.children, tempParentElem.id, tempElem.id);
          return {
            ...element,
          };
        } else {
          return element;
        }
      });

      insertAt(
        newEles,
        newEles.find((element) => element.id == action.payload.parentId),
        tempElem
      );

      return { ...state, elements: newEles, dirty: true };
    }
    //==>
    case ITEM_INDENT: {
      let tempElem = elements.find(
        (element) => element.id == action.payload.elemId
      );
      // if it is top level elem, dont tab
      if (action.payload.parentId === "") return state;

      let tempParentElem = elements.find(
        (element) => element.id == action.payload.parentId
      );
      if (tempParentElem.children.indexOf(action.payload.elemId) == 0)
        return state;
      const updateElems = elements
        .filter((element) => action.payload.elemId.indexOf(element.id) == -1)
        .map((element) => {
          if (element.id == action.payload.parentId) {
            return {
              ...element,
              children: element.children.filter(
                (child) => child !== action.payload.elemId
              ),
            };
          }
          return element;
        });

      let newParentId =
        tempParentElem.children[
          tempParentElem.children.indexOf(action.payload.elemId) - 1
        ];
      tempElem.parentId = newParentId;
      const newEles = updateElems.map((element) => {
        if (element.id == newParentId) {
          return {
            ...element,
            children: [...element.children, tempElem.id],
          };
        } else {
          return element;
        }
      });

      insertAt(
        newEles,
        newEles.find((element) => element.id == newParentId),
        tempElem
      );

      return { ...state, elements: newEles, dirty: true };
    }
    default: {
      return state;
    }
  }
};

import { SET_BUFL_ELEMENTS } from "../constants/action_types";
import { guidGenerator } from "../utils/uuid.util";

export function Save() {
  return {
    type: "SAVE",
    payload: {},
  };
}

export function Load() {
  return {
    type: "LOAD",
    payload: {},
  };
}

export const setBuflElements = (elements) => {
  return {
    type: SET_BUFL_ELEMENTS,
    payload: {
      elements: elements,
    },
  };
};

export const loadBuflElements = () => (dispatch, getState) => {
  const { file } = getState();
  const elements = file.elements;
  dispatch(setBuflElement(elements));
};

export const toggleCompleteElm = (id) => (dispatch, getState) => {
  const state = getState();
  var obj = JSON.parse(JSON.stringify(state.bufl.elements));
  function recursiveStrikethrough(obj, completed) {
    //go down on object tree and assign their completed fields in to the completed variable value
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj.completed = completed;
        if ("object" === typeof obj[key]) {
          recursiveStrikethrough(obj[key], completed);
        }
      }
    }
  }

  function recursiveSearch(obj, id) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj.id === id) {
          //console.log(obj.name);
          obj.completed = !obj.completed;

          recursiveStrikethrough(obj.items, obj.completed);

          return;
        }
        if ("object" === typeof obj[key]) {
          recursiveSearch(obj[key], id);
        }
      }
    }
  }
  recursiveSearch(obj, id);

  dispatch(setBuflElements(obj));
};

export const toggleCollapseElm = (id) => (dispatch, getState) => {
  const state = getState();
  var obj = JSON.parse(JSON.stringify(state.bufl.elements));
  function recursiveSearch(obj, id) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj.id === id) {
          //console.log(obj.name);
          obj.collapsed = !obj.collapsed;
          return;
        }
        if ("object" === typeof obj[key]) {
          recursiveSearch(obj[key], id);
        }
      }
    }
  }
  recursiveSearch(obj, id);
  dispatch(setBuflElements(obj));
};
export const changeElmName = (id, name) => (dispatch, getState) => {
  const state = getState();
  var obj = JSON.parse(JSON.stringify(state.bufl.elements));
  function recursiveSearch(obj, id) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj.id === id) {
          //console.log(obj.name);
          obj.name = name;
          return;
        }
        if ("object" === typeof obj[key]) {
          recursiveSearch(obj[key], id);
        }
      }
    }
  }
  recursiveSearch(obj, id);
  dispatch(setBuflElements(obj));
};

export const deleteNode = (id) => (dispatch, getState) => {
  const state = getState();
  var obj = JSON.parse(JSON.stringify(state.bufl.elements));

  function recursiveSearch(obj, id) {
    for (var key in obj) {
      if (obj[key].hasOwnProperty("items")) {
        for (var index in obj[key].items) {
          //console.log(obj[key].items[index].name);
          if (obj[key].items[index].id === id) {
            obj[key].items.splice(index, 1);
            return;
          }
        }
      } else if (obj[key].id === id) {
        obj.splice(key, 1);
      }

      if (obj.hasOwnProperty(key)) {
        if ("object" === typeof obj[key]) {
          recursiveSearch(obj[key], id);
        }
      }
    }
  }

  recursiveSearch(obj, id);
  dispatch(setBuflElements(obj));
};

export const addNode = (id) => (dispatch, getState) => {
  const state = getState();
  var obj = JSON.parse(JSON.stringify(state.bufl.elements));
  var find = false;
  function recursiveSearch(obj, id) {
    for (var key in obj) {
      if (obj[key].hasOwnProperty("items")) {
        for (var index in obj[key].items) {
          //console.log(obj[key].items[index].name);
          if (obj[key].items[index].id === id) {
            obj[key].items.push({
              id: guidGenerator(),
              name: "",
              collapsed: false,
              completed: false,
            });
            find = true;
            return;
          }
        }
      }

      if (obj.hasOwnProperty(key)) {
        if ("object" === typeof obj[key]) {
          recursiveSearch(obj[key], id);
        }
      }
    }
  }
  if (find === false)
    obj.push({
      id: guidGenerator(),
      name: "",
      collapsed: false,
      completed: false,
    });
  recursiveSearch(obj, id);
  dispatch(setBuflElements(obj));
};

export const addChild = (id) => (dispatch, getState) => {
  const state = getState();
  var obj = JSON.parse(JSON.stringify(state.bufl.elements));

  function recursiveSearch(obj, id) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj.id === id) {
          //console.dir(obj);
          if (obj.items) {
            obj.items.push({
              id: guidGenerator(),
              name: "",
              collapsed: false,
              completed: false,
            });
          } else {
            obj.items = [
              {
                id: guidGenerator(),
                name: "",
                collapsed: false,
                completed: false,
              },
            ];
          }
          return;
        }
        if ("object" === typeof obj[key]) {
          recursiveSearch(obj[key], id);
        }
      }
    }
  }
  recursiveSearch(obj, id);
  dispatch(setBuflElements(obj));
};

export const addToParent = (id) => (dispatch, getState) => {
  const state = getState();
  var obj = JSON.parse(JSON.stringify(state.bufl.elements));
  function recursiveSearch(obj, id) {
    for (var key in obj) {
      if (obj[key].hasOwnProperty("items")) {
        for (var index in obj[key].items) {
          //console.log(obj[key].items[index].name);
          if (obj[key].items[index].id === id) {
            obj.push(obj[key].items[index]);
            obj[key].items.splice(index, 1);
            return;
          }
        }
      }

      if (obj.hasOwnProperty(key)) {
        if ("object" === typeof obj[key]) {
          recursiveSearch(obj[key], id);
        }
      }
    }
  }
  recursiveSearch(obj, id);
  dispatch(setBuflElements(obj));
};

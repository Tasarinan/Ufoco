import { createSelector } from "reselect";

import { elements, element } from "selectors/common.selectors";

export const selectedElement = createSelector(
  [elements, element],
  (eles, ele) => {
    // eslint-disable-next-line
    var obj = JSON.parse(JSON.stringify(eles));
    var eleObj;
    function recursiveSearch(obj, id) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (obj.id === id) {
            eleObj = obj;
            return eleObj;
          }
          if ("object" === typeof obj[key]) {
            recursiveSearch(obj[key], id);
          }
        }
      }
    }
    recursiveSearch(obj, ele.id);
  }
);

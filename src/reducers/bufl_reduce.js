import { SET_BUFL_ELEMENTS } from "../constants/action_types";
import jsonData from "../../@test/config/bufllist.json";
const initialState = {
  elements: jsonData.elements,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BUFL_ELEMENTS: {
      return { ...state, elements: action.payload.elements };
    }
    default: {
      return state;
    }
  }
};

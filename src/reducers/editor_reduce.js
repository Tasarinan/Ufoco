import { FETCH_ELE_DETAIL } from "../constants/action_types";

const initialState = {
  enableSpellcheck: true,
  hideHeadline: false,
  note: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ELE_DETAIL: {
      return {
        ...state,
        note: action.payload.note,
      };
    }
    default: {
      return state;
    }
  }
}

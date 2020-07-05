import { TOGGLE_COMPACT_MODE, SET_OVERLAY } from "../constants/action_types";

const initialState = {
  compact: false,
  overlay: "none",
};
export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_COMPACT_MODE: {
      const { compact } = state;
      return { ...state, compact: !compact };
    }
    case SET_OVERLAY: {
      return {
        ...state,
        overlay: action.payload.overlay,
      };
    }
    default: {
      return state;
    }
  }
};

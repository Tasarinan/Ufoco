import prefRepository from "../repositories/prefRepository";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../constants/action_types";

const initialState = {
  isAuthenticated: false,
  isLoading: prefRepository.isLoading(),
  userStatus: "logout",
};
export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return { ...state, isAuthenticated: false, userStatus: "registering" };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isLoading: true,
        userStatus: "registered",
      };
    }
    case REGISTER_FAILURE: {
      return { ...state, isAuthenticated: false, userStatus: "invalid" };
    }
    case LOGIN_REQUEST: {
      return { ...state, isAuthenticated: false, userStatus: "loggingIn" };
    }
    case LOGIN_SUCCESS: {
      return { ...state, isAuthenticated: true, userStatus: "loggedIn" };
    }
    case LOGIN_FAILURE: {
      return { ...state, isAuthenticated: false, userStatus: "invalid" };
    }
    default: {
      return state;
    }
  }
};

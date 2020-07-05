import {
  DECRYPT_ERROR,
  DECRYPT_IN_PROGRESS,
  DECRYPT_SUCCESS,
  ENCRYPT_ERROR,
  ENCRYPT_IN_PROGRESS,
  ENCRYPT_SUCCESS,
  SET_HASHED_PASSWORD,
  SET_FILE_EXISTS,
} from "../constants/action_types";
import jsonData from "../../@test/config/bufllist.json";

// initialize state
const initialState = {
  decryptErrorMsg: "",
  decryptStatus: "idle",
  encryptErrorMsg: "",
  encryptStatus: "idle",
  entries: {},
  elements: jsonData.elements,
  fileExists: false,
  hashedPassword: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DECRYPT_IN_PROGRESS: {
      return {
        ...state,
        decryptErrorMsg: "",
        decryptStatus: "inProgress",
      };
    }
    case DECRYPT_ERROR: {
      return {
        ...state,
        decryptErrorMsg: action.payload.decryptErrorMsg,
        decryptStatus: "error",
      };
    }
    case DECRYPT_SUCCESS: {
      return {
        ...state,
        decryptErrorMsg: "",
        decryptStatus: "idle",
        elements: action.payload.elements,
        entries: action.payload.entries,
      };
    }
    case ENCRYPT_IN_PROGRESS: {
      return {
        ...state,
        encryptStatus: "inProgress",
      };
    }
    case ENCRYPT_ERROR: {
      return {
        ...state,
        encryptErrorMsg: action.payload.encryptErrorMsg,
        encryptStatus: "error",
      };
    }
    case ENCRYPT_SUCCESS: {
      return {
        ...state,
        encryptStatus: "idle",
        elements: action.payload.elements,
        entries: action.payload.entries,
      };
    }
    case SET_FILE_EXISTS: {
      return {
        ...state,
        fileExists: action.payload.fileExists,
      };
    }
    case SET_HASHED_PASSWORD: {
      return {
        ...state,
        hashedPassword: action.payload.hashedPassword,
      };
    }
    default:
      return state;
  }
}

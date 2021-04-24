import {
  DECRYPT_ERROR,
  DECRYPT_IN_PROGRESS,
  DECRYPT_SUCCESS,
  ENCRYPT_ERROR,
  ENCRYPT_IN_PROGRESS,
  ENCRYPT_SUCCESS,
} from '../constants/action_types';

// initialize state
const initialState = {
  decryptErrorMsg: '',
  decryptStatus: 'idle',
  encryptErrorMsg: '',
  encryptStatus: 'idle',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DECRYPT_IN_PROGRESS: {
      return {
        ...state,
        decryptErrorMsg: '',
        decryptStatus: 'inProgress',
      };
    }
    case DECRYPT_ERROR: {
      return {
        ...state,
        decryptErrorMsg: action.payload.decryptErrorMsg,
        decryptStatus: 'error',
      };
    }
    case DECRYPT_SUCCESS: {
      return {
        ...state,
        decryptErrorMsg: '',
        decryptStatus: 'success',
      };
    }
    case ENCRYPT_IN_PROGRESS: {
      return {
        ...state,
        encryptStatus: 'inProgress',
      };
    }
    case ENCRYPT_ERROR: {
      return {
        ...state,
        encryptErrorMsg: action.payload.encryptErrorMsg,
        encryptStatus: 'error',
      };
    }
    case ENCRYPT_SUCCESS: {
      return {
        ...state,
        encryptStatus: 'success',
      };
    }

    default:
      return state;
  }
}

import userRepository from "../repositories/userRepository";
import { push } from "react-router-redux";
import { ipcRenderer } from "electron";
import {
  decryptFile,
  createEncryptedFile,
  testFileExists,
} from "./file_action";

import { Routes } from "../constants/enums";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../constants/action_types";
import { ON_CHANGE_WINDOW_SIZE } from "../constants/ipc_channels";
export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};
export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};
export const loginFailure = () => {
  return {
    type: LOGIN_FAILURE,
  };
};
export const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};
export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};
export const registerFailure = () => {
  return {
    type: REGISTER_FAILURE,
  };
};

export const register = (email, password, encryptedMode) => (dispatch) => {
  dispatch(registerRequest());
  if (userRepository.isInitialized() === false) {
    dispatch(createEncryptedFile(password));
    //prefRepository.setHashPassword(hashPassword(password));
    userRepository.setUserEmail(email);
    userRepository.setEncryptedMode(encryptedMode);
    dispatch(testFileExists());
    dispatch(registerSuccess());
    dispatch(push(Routes.ROOT));
    //ipcRenderer.send(ON_CHANGE_WINDOW_SIZE);
  } else {
    dispatch(registerFailure());
  }
};

export const login = (email, password) => (dispatch) => {
  dispatch(loginRequest());
  if (email === userRepository.getUserEmail()) {
    dispatch(decryptFile(password));
    dispatch(loginSuccess());
    dispatch(push(Routes.ROOT));
    //ipcRenderer.send(ON_CHANGE_WINDOW_SIZE);
  } else {
    dispatch(loginFailure());
  }
};

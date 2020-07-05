import prefRepository from "../repositories/prefRepository";
import { push } from "react-router-redux";
import { ipcRenderer } from "electron";
import {
  decryptFile,
  createEncryptedFile,
  testFileExists,
} from "./file_action";

import { Routes, ViewSize } from "../constants/enums";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../constants/action_types";
import { ON_CHANGE_WINDOW_SIZE } from "../constants/ipc_channels";
import { hashPassword } from "../utils/password.util";
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

export const register = (account, password) => (dispatch) => {
  dispatch(registerRequest());
  if (prefRepository.getAccount() === "") {
    createEncryptedFile(password);
    prefRepository.setHashPassword(hashPassword(password));
    prefRepository.setAccount(account);
    testFileExists();
    dispatch(registerSuccess());
    dispatch(push(Routes.HOME));
    ipcRenderer.send(ON_CHANGE_WINDOW_SIZE, ViewSize.NORMAL);
  } else {
    dispatch(registerFailure());
  }
};

export const login = (password) => (dispatch) => {
  dispatch(loginRequest());
  if (hashPassword(password) === prefRepository.getHashPassword()) {
    if (decryptFile(password)) {
      dispatch(loginSuccess());
      dispatch(push("/"));
      ipcRenderer.send(ON_CHANGE_WINDOW_SIZE, ViewSize.NORMAL);
    }
  } else {
    dispatch(loginFailure());
  }
};

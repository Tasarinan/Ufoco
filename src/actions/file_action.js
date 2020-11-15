import {
  getyebFilePath,
  getMetadata,
  writeEncryptedFile,
  fileExists,
  readEncryptedFile,
  createBackup,
} from "../utils/file.util";
import { performMigrations } from "../utils/md.util";
import logger from "electron-log";
import {
  DECRYPT_ERROR,
  DECRYPT_IN_PROGRESS,
  DECRYPT_SUCCESS,
  ENCRYPT_IN_PROGRESS,
  ENCRYPT_SUCCESS,
  ENCRYPT_ERROR,
  SET_HASHED_PASSWORD,
  SET_FILE_EXISTS,
  LOAD_FILE_TO_ELES,
  SAVE_ELES_TO_FILE,
} from "../constants/action_types";
import { hashPassword } from "../utils/password.util";
import { element } from "prop-types";

export const setDecryptInProgress = () => {
  return {
    type: DECRYPT_IN_PROGRESS,
  };
};
export const setDecryptError = (decryptErrorMsg) => {
  return {
    type: DECRYPT_ERROR,
    payload: {
      decryptErrorMsg,
    },
  };
};
export const setDecryptSuccess = () => {
  return {
    type: DECRYPT_SUCCESS,
  };
};

export const setEncryptInProgress = () => {
  return {
    type: ENCRYPT_IN_PROGRESS,
  };
};

export const setEncryptSuccess = () => {
  return {
    type: ENCRYPT_SUCCESS,
  };
};

export const setEncryptError = (encryptErrorMsg) => {
  return {
    type: ENCRYPT_ERROR,
    payload: {
      encryptErrorMsg,
    },
  };
};

export const setHashedPassword = (hashedPassword) => {
  return {
    type: SET_HASHED_PASSWORD,
    payload: {
      hashedPassword,
    },
  };
};

export const setFileExists = (exists) => {
  return {
    type: SET_FILE_EXISTS,
    payload: {
      fileExists: exists,
    },
  };
};

export const saveElesToFile = () => {
  return {
    type: SAVE_ELES_TO_FILE,
  };
};

export const loadFileToEles = (itemData) => {
  return {
    type: LOAD_FILE_TO_ELES,
    payload: {
      elements: itemData,
    },
  };
};

/**
 * Test whether a diary file exists at the path specified in the preferences
 */
export const testFileExists = () => (dispatch) => {
  const filePath = getyebFilePath();
  dispatch(setFileExists(fileExists(filePath)));
};

/**
 * Read flow bullet journal  from disk
 */
export const decryptFile = (password) => (dispatch) => {
  const filePath = getyebFilePath();
  dispatch(setDecryptInProgress());
  const hashedPassword = hashPassword(password);
  try {
    const fileContent = readEncryptedFile(filePath, hashedPassword);
    let data = JSON.parse(fileContent);
    // On success: Save password
    dispatch(setHashedPassword(hashedPassword));

    // Perform data migrations between app updates if necessary
    data = performMigrations(data);

    // Load bullet flow journal entries and save password
    const { elements } = data;
    dispatch(setDecryptSuccess());
    dispatch(loadFileToEles(elements));
    // createIndex(entries);
    // enableMenuItems();
    createBackup();
  } catch (err) {
    // Error reading diary file
    let errorMsg;
    if (err.message.endsWith("BAD_DECRYPT")) {
      errorMsg = "wrong-password";
    } else {
      errorMsg = `${"decryption-error"}: ${err.message}`;
    }
    logger.error("Error decrypting diary file: ", err);
    dispatch(setDecryptError(errorMsg));
  }
};

/**
 * Create new encrypted flowbullet Jonoral file and index with the provided password
 */
export const createEncryptedFile = (password) => (dispatch) => {
  const elements = [
    {
      id: "root",
      parentId: "",
      name: "",
      children: [],
    },
  ];
  const filePath = getyebFilePath();

  const content = {
    metadata: getMetadata(),
    elements,
  };
  dispatch(setEncryptInProgress());
  const hashedPassword = hashPassword(password);
  try {
    writeEncryptedFile(filePath, hashedPassword, JSON.stringify(content));
    dispatch(setEncryptSuccess());
    dispatch(loadFileToEles(elements));
    dispatch(setHashedPassword(hashedPassword));
    //TODO
    // createIndex(entries);
    //enableMenuItems();
  } catch (error) {
    logger.error("Error creating encrypted diary file: ", error);
    dispatch(setEncryptError(error.message));
  }
};

export const autoSaveDirtyData = () => (dispatch, getState) => {
  const { hashedPassword } = getState().file;
  const { elements } = getState().item;
  dispatch(saveEncryptedFile(elements, hashedPassword));
};
/**
 * save the element in the state. Then write the element to the
 * encrypted  file and update the index
 */
export const saveEncryptedFile = (elements, hashedPassword) => (dispatch) => {
  const filePath = getyebFilePath();
  const fileContent = {
    metadata: getMetadata(),
    elements,
  };
  dispatch(setEncryptInProgress());
  try {
    writeEncryptedFile(filePath, hashedPassword, JSON.stringify(fileContent));
    dispatch(setEncryptSuccess());
    dispatch(saveElesToFile(elements));
  } catch (err) {
    logger.error("Error updating encrypted diary file: ", err);
    dispatch(setEncryptError(err.message));
  }
};

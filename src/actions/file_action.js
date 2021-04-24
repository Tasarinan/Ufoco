import {
  getJotterFilePath,
  getMetadata,
  writeEncryptedFile,
  fileExists,
  readEncryptedFile,
  createBackup,
  createDefaultJotterStructure,
} from '../utils/file.util';
import { performMigrations } from '../utils/md.util';
import logger from 'electron-log';
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
  LOAD_TASKS_FROM_FILE,
  SAVE_TASKS_TO_FILE,
} from '../constants/action_types';
import { hashPassword } from '../utils/password.util';

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

export const LoadTasksFromFile = (taskletData) => {
  return {
    type: LOAD_TASKS_FROM_FILE,
    payload: {
      tasklets: taskletData,
    },
  };
};

export const saveTasksToFile = () => {
  return {
    type: SAVE_TASKS_TO_FILE,
  };
};
/**
 * Read jotter file from disk
 * Check file exist or not
 * if file exist, read content
 * if file not  exist then check backup
 * if backup exist then restore backup
 * if backup not exist, then read default content
 */
export const decryptFile = (password) => (dispatch) => {
  const filePath = getJotterFilePath();
  dispatch(setDecryptInProgress());
  if (!fileExists(filePath)) {
    //restore one default or backup
    createDefaultJotterStructure();
  }
  // const hashedPassword = hashPassword(password);
  try {
    const fileContent = readEncryptedFile(filePath);
    let data = JSON.parse(fileContent);
    // On success: Save password
    // dispatch(setHashedPassword(hashedPassword));

    // Perform data migrations between app updates if necessary
    data = performMigrations(data);

    // Load bullet flow journal entries and save password
    const { elements, tasklets } = data;
    dispatch(setDecryptSuccess());
    dispatch(loadFileToEles(elements));
    dispatch(LoadTasksFromFile(tasklets));
    // createIndex(entries);
    // enableMenuItems();
    createBackup();
  } catch (err) {
    // Error reading diary file
    let errorMsg;
    if (err.message.endsWith('BAD_DECRYPT')) {
      errorMsg = 'wrong-password';
    } else {
      errorMsg = `${'decryption-error'}: ${err.message}`;
    }
    logger.error('Error decrypting diary file: ', err);
    dispatch(setDecryptError(errorMsg));
  }
};

/**
 * Create new encrypted jotter  file in disk
 * check if file is existed
 * if file is existed, create a backup and replace a default
 * if file is no existed, create a default
 */
export const createEncryptedFile = (password) => (dispatch) => {
  /*const elements = [
    {
      id: 'root',
      parentId: '',
      name: '',
      children: [],
    },
  ];
  const content = {
    metadata: getMetadata(),
    elements,
  };*/

  const filePath = getJotterFilePath();
  dispatch(setEncryptInProgress());
  if (fileExists(filePath)) {
    createBackup();
  }
  //const hashedPassword = hashPassword(password);
  try {
    let data = createDefaultJotterStructure(filePath);
    //writeEncryptedFile(filePath, hashedPassword, JSON.stringify(content));
    dispatch(setEncryptSuccess());
    const { elements, tasklets } = data;
    dispatch(loadFileToEles(elements));
    dispatch(saveTasksToFile(tasklets));
    //dispatch(setHashedPassword(hashedPassword));
    //TODO
    // createIndex(entries);
    //enableMenuItems();
  } catch (error) {
    logger.error('Error creating encrypted diary file: ', error);
    dispatch(setEncryptError(error.message));
  }
};

export const autoSaveDirtyData = () => (dispatch, getState) => {
  const { elements } = getState().item;
  const { tasklets } = getState().task;
  dispatch(saveEncryptedFile(elements, tasklets));
};
/**
 * save in the disk
 * update index
 */
export const saveEncryptedFile = (elements, tasklets) => (dispatch) => {
  const filePath = getJotterFilePath();
  const fileContent = {
    metadata: getMetadata(),
    elements,
    tasklets,
  };
  dispatch(setEncryptInProgress());
  try {
    writeEncryptedFile(filePath, JSON.stringify(fileContent));
    dispatch(setEncryptSuccess());
    dispatch(saveElesToFile(elements));
  } catch (err) {
    logger.error('Error updating encrypted diary file: ', err);
    dispatch(setEncryptError(err.message));
  }
};

import { remote } from 'electron';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';

import userRepository from '../repositories/userRepository';
import jotterStructureTemplate from '../repositories/structureTemplate';
import { getUpdateDate, toFileNameDate } from './date.util';
import { hashPassword } from './password.util';
export const FILE_NAME = 'jotter.txt';
const FILE_DIR = remote.app.getPath('userData');
const CIPHER = 'aes-192-cbc';
const PREF_DIR = remote.app.getPath('userData');
const BACKUP_DIR = path.join(PREF_DIR, 'backups');
const FILES_TO_KEEP = 50;

const METADATA = {
  application: remote.app.name,
  version: remote.app.getVersion(),
};

/**
 * Return path to flow bullet journal file (set in preferences)
 */
export const getJotterFilePath = () => {
  // Concatenate and return directory preference with file name
  let fileDir = userRepository.getDatapath();
  if (fileDir === '') fileDir = FILE_DIR;
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
  }
  return path.join(fileDir, FILE_NAME);
};

// Create a new blank flow
export const createDefaultJotterStructure = (jotterFilePath) => {
  if (!fileExists(jotterFilePath)) {
    let newjotterStructure = JSON.stringify(jotterStructureTemplate);
    writeEncryptedFile(jotterFilePath, newjotterStructure);
  }
  return newjotterStructure;
};

/**
 * Return metadata to include in encrypted diary file (consists of app version and date of last
 * write)
 */
export const getMetadata = () => {
  return {
    ...METADATA,
    dateUpdated: getUpdateDate().toString(),
  };
};
export const fileExists = (filePath) => {
  return fs.existsSync(filePath);
};

export const copyFile = (sourcePath, destinationPath) => {
  fs.copyFileSync(sourcePath, destinationPath);
};

/**
 * Return
 */
export const writeEncryptedFile = (filePath, content) => {
  const encryptedMode = userRepository.getEncryptedMode();
  const hashedPassword = hashPassword(userRepository.getPassword());
  if (encryptedMode == true) {
    const cipher = crypto.createCipher(CIPHER, hashedPassword);
    const encrypted = Buffer.concat([cipher.update(Buffer.from(content, 'utf8')), cipher.final()]);
    fs.writeFileSync(filePath, encrypted);
  } else {
    fs.writeFileSync(filePath, content);
  }
};

export const readEncryptedFile = (filePath) => {
  const data = fs.readFileSync(filePath);
  const encryptedMode = userRepository.getEncryptedMode();
  const hashedPassword = hashPassword(userRepository.getPassword());
  if (encryptedMode == true) {
    const decipher = crypto.createDecipher(CIPHER, hashedPassword);
    const fileContent = Buffer.concat([decipher.update(data), decipher.final()]);
    return fileContent.toString();
  } else {
    return data.toString();
  }
};

/**
 * Create a copy of the encrypted jotter file and delete old backup files if necessary
 */
export const createBackup = () => {
  createBackupDir(BACKUP_DIR);
  deleteOldBackupFiles(BACKUP_DIR, FILES_TO_KEEP);
  createBackupFile(BACKUP_DIR);
};

/**
 * Create backup directory at specified path if it doesn't exist yet
 */
function createBackupDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

/**
 * Create a backup of the diary by copying the jotter file to the backup directory
 */
function createBackupFile(dir) {
  const dateTime = toFileNameDate(getUpdateDate());
  const jotterFilePath = getJotterFilePath();
  const backupPath = path.join(dir, `backup-${dateTime}.txt`);
  copyFile(jotterFilePath, backupPath);
}

/**
 * Delete old backup files until the requested number of files remain
 */
function deleteOldBackupFiles(dir, filesToKeep) {
  const files = fs.readdirSync(dir);
  const txtFiles = files.filter((fileName) => fileName.endsWith('.txt'));
  if (txtFiles.length > filesToKeep) {
    for (let fileIndex = 0; fileIndex < txtFiles.length - filesToKeep; fileIndex += 1) {
      const fileToDelete = path.join(BACKUP_DIR, txtFiles[fileIndex]);
      fs.unlinkSync(fileToDelete);
    }
  }
}

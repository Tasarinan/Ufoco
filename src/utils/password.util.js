import crypto from "crypto";

const CIPHER = "sha512";
const ITERATIONS = 500000;
const KEY_BYTE_LENGTH = 64;
const SALT = "R21qNfzH8VS7YK1CBwoNrOwA0Mki5zDIGJaw1pvDdb9rIRK9y9qptwmBsqLkMj5Y";

export const hashPassword = (password) => {
  try {
    const hash = crypto.pbkdf2Sync(
      password,
      SALT,
      ITERATIONS,
      KEY_BYTE_LENGTH,
      CIPHER
    );
    return hash.toString("hex");
  } catch (err) {
    throw Error(`Error while hashing password: ${err.toString()}`);
  }
};

import moment from "moment";

const DAY_ONE_DATE_FORMAT = "DD MMMM YYYY [at 00:00:00 GMT]"; // E.g. "01 January 2019 at 00:00:00 GMT"
const DATE_STRING_FORMAT = "LL"; // E.g. "January 1, 2019"
const FILE_NAME_DATE_FORMAT = "YYYY-MM-DD-HH[h]mm"; // E.g. "2019-01-01-12h30"
const INDEX_DATE_FORMAT = "YYYY-MM-DD"; // E.g. "2019-01-01"
const LOCALE_WEEKDAY_FORMAT = "dddd, LL"; // E.g. "Tuesday, January 1, 2019" for "en-us" locale
const MONTH_YEAR_FORMAT = "MMMM YYYY"; // E.g. "January 2019"

/* eslint-disable import/prefer-default-export */
export const getDate = (date = new Date()) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const dateString = `${month} ${day}, ${year}`;

  return dateString;
};

/**
 * Creates a Moment object instance for the current date and time
 */
export const getUpdateDate = () => {
  return moment();
};

/**
 * Creates a Moment object instance for the provided date
 */
export const parseDate = (date, format) => {
  return moment(date, format);
};

/**
 * Create and return Moment object from diary index string
 */
export const fromIndexDate = (dateString) => {
  return parseDate(dateString, INDEX_DATE_FORMAT);
};

/**
 * Format date as locale-dependent string
 */
export const toDateString = (date) => {
  return parseDate(date).format(DATE_STRING_FORMAT);
};

/**
 * Format date as a string compatible with the import tool of Day One
 */
export const toDayOneDate = (date) => {
  return parseDate(date).format(DAY_ONE_DATE_FORMAT);
};

/**
 * Format date as string for inclusion in file name
 */
export const toFileNameDate = (date) => {
  return parseDate(date).format(FILE_NAME_DATE_FORMAT);
};

/**
 * Format date as diary index string
 */
export const toIndexDate = (date) => {
  return parseDate(date).format(INDEX_DATE_FORMAT);
};

/**
 * Format date as locale-dependent string with weekday
 */
export const toLocaleWeekday = (date) => {
  return parseDate(date).format(LOCALE_WEEKDAY_FORMAT);
};

/**
 * Format date as month and year
 */
export const toMonthYear = (date) => {
  return parseDate(date).format(MONTH_YEAR_FORMAT);
};

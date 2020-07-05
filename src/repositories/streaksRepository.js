import pouchDB from "./pouchdbPersistence.js";
const shortid = require("shortid");

function defaultStreak() {
  return {
    id: "defaultid",
    label: "Default Streak",
    prependNewItem: false,
    showProgress: false,
    showDone: false
  };
}
export default {
  async addNewStreak(streakName, defaults) {
    const response = await pouchDB.findItems({
      findParams: {
        selector: {
          compare: { $gt: null },
          type: "customer"
        },
        sort: [{ compare: "asc" }]
      },
      fields: ["compare", "type"]
    });
    const customers = response ? response.docs : null;
  }
};

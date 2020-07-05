import jsonData from "../../@test/config/entry.json";
const initialState = {
  entries: jsonData.entries,
  enableSpellcheck: true,
  hideTitles: false,
  guidSelected: " ",
  entry: jsonData,
};
export default (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

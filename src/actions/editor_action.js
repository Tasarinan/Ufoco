import { ipcRenderer } from "electron";

import { FETCH_ELE_DETAIL } from "../constants/action_types";

export const fetchElmDetail = (note) => {
  return {
    type: FETCH_ELE_DETAIL,
    payload: {
      note: note,
    },
  };
};

export const fetchDetail = (id) => (dispatch, getState) => {
  const {
    item: { elements },
  } = getState();
  const selectedEle = elements.find((element) => element.id == id);
  dispatch(fetchElmDetail(selectedEle.note));
};

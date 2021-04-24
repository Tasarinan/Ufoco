import { LOAD_TASKS_FROM_FILE, SAVE_TASKS_TO_FILE } from '../constants/action_types';

const initialState = {
  tasklets: [],
  dirty: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TASKS_FROM_FILE: {
      const newTasklets = action.payload.tasklets;
      return {
        ...state,
        tasklets: newTasklets,
        dirty: false,
      };
    }
    case SAVE_TASKS_TO_FILE:
      return {
        ...state,
        dirty: false,
      };

    default: {
      return state;
    }
  }
};

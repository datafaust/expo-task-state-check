import { combineReducers } from 'redux';

const INITIAL_STATE = {
  submitted: false,
  test: 'test'
};

const ourReducer = (state = INITIAL_STATE, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "SUBMITTED":
      return {
        ...state,
        submitted: action.value
      }
      break;
    case "STORE_USER_ID":
      return {
        ...state,
        userId: [action.value, action.value1, action.value2, action.value3],
      }
      break;
  }
  return newState;
};


export default combineReducers({
  reducer: ourReducer,
});

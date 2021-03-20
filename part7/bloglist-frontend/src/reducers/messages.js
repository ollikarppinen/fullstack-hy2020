const initialState = {
  errorMessage: null,
  message: null,
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return { ...state, message: action.message };
    case "SET_ERROR_MESSAGE":
      return { ...state, errorMessage: action.errorMessage };
    case "RESET_MESSAGE":
      return { ...state, message: null };
    case "RESET_ERROR_MESSAGE":
      return { ...state, errorMessage: null };
    default:
      return state;
  }
};

export default messagesReducer;

const setMessage = (message) => ({
  type: "SET_MESSAGE",
  message,
});

const resetMessage = () => ({
  type: "RESET_MESSAGE",
});

export const showMessage = (message) => {
  return (dispatch) => {
    dispatch(setMessage(message));
    setTimeout(() => dispatch(resetMessage()), 3000);
  };
};

const setErrorMessage = (errorMessage) => ({
  type: "SET_ERROR_MESSAGE",
  errorMessage,
});

const resetErrorMessage = () => ({
  type: "RESET_ERROR_MESSAGE",
});

export const showErrorMessage = (errorMessage) => {
  return (dispatch) => {
    dispatch(setErrorMessage(errorMessage));
    setTimeout(() => dispatch(resetErrorMessage()), 3000);
  };
};

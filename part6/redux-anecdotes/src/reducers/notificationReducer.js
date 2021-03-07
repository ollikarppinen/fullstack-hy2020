const initialState = "initial notification";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NOTIFY":
      return action.data.message;
    case "HIDE_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export const setNotification = (message, duration) => async (dispatch) => {
  dispatch({
    type: "NOTIFY",
    data: { message },
  });
  setTimeout(() => {
    dispatch({
      type: "HIDE_NOTIFICATION",
    });
  }, duration * 1000);
};

export default reducer;

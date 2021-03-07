const initialState = { message: null, timeoutId: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NOTIFY":
      clearTimeout(state.timeoutId);
      return action.data;
    case "HIDE_NOTIFICATION":
      return initialState;
    default:
      return state;
  }
};

export const setNotification = (message, duration) => async (dispatch) => {
  const timeoutId = setTimeout(() => {
    dispatch({
      type: "HIDE_NOTIFICATION",
    });
  }, duration * 1000);
  dispatch({
    type: "NOTIFY",
    data: { message, timeoutId },
  });
};

export default reducer;

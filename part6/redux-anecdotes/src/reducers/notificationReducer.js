const initialState = "initial notification";

const reducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "NOTIFY":
      return action.data.message;
    case "HIDE_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export const notify = (message) => ({
  type: "NOTIFY",
  data: { message },
});

export const hideNotification = () => ({
  type: "HIDE_NOTIFICATION",
});

export default reducer;

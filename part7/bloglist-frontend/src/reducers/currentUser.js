const fetchCurrentUserFromLocalStorage = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
  return loggedUserJSON ? JSON.parse(loggedUserJSON) : null;
};

const currentUserReducer = (
  state = fetchCurrentUserFromLocalStorage(),
  action
) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    case "REMOVE_USER":
      return null;
    default:
      return state;
  }
};

export const setCurrentUserAction = (user) => ({
  type: "SET_CURRENT_USER",
  user,
});

export const removeCurrentUserAction = () => ({ type: "REMOVE_CURRENT_USER" });

export const setCurrentUser = (user) => (dispatch) =>
  dispatch(setCurrentUserAction(user));

export const removeCurrentUser = () => (dispatch) =>
  dispatch(removeCurrentUserAction());

export default currentUserReducer;

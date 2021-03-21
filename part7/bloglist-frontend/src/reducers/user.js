const fetchUserFromLocalStorage = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
  return loggedUserJSON ? JSON.parse(loggedUserJSON) : null;
};

const userReducer = (state = fetchUserFromLocalStorage(), action) => {
  switch (action.type) {
    case "SET_USER":
      return action.user;
    case "REMOVE_USER":
      return null;
    default:
      return state;
  }
};

export const setUserAction = (user) => ({ type: "SET_USER", user });

export const removeUserAction = () => ({ type: "REMOVE_USER" });

export const setUser = (user) => (dispatch) => dispatch(setUserAction(user));

export const removeUser = () => (dispatch) => dispatch(removeUserAction());

export default userReducer;

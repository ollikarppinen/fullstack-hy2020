const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};

const setUsersAction = (users) => ({
  type: "SET_USERS",
  users,
});

export const getAllUsers = (usersService) => (dispatch) =>
  usersService.getAll().then((users) => dispatch(setUsersAction(users)));

export default usersReducer;

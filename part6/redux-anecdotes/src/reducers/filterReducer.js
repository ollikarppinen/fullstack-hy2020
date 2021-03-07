const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_FILTER":
      return action.data.filter;
    default:
      return state;
  }
};

export const changeFilter = (filter) => ({
  type: "CHANGE_FILTER",
  data: { filter },
});

export default reducer;

import anecdoteService from "../services/anecdotes";

const orderByVotes = (anecdotes) => anecdotes.sort((a, b) => b.votes - a.votes);

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data;
    case "UPDATE_ANECDOTE":
      return orderByVotes(
        state.map((anecdote) =>
          anecdote.id === action.data.id ? action.data : anecdote
        )
      );
    case "NEW_ANECDOTE":
      return orderByVotes([action.data, ...state]);
    default:
      return state;
  }
};

export const addAnecdote = (anecdote) => ({
  type: "NEW_ANECDOTE",
  data: anecdote,
});

export const initializeAnecdotes = () => async (dispatch) =>
  dispatch({
    type: "INIT_ANECDOTES",
    data: await anecdoteService.getAll(),
  });

export const createAnecdote = (anecdote) => async (dispatch) =>
  dispatch({
    type: "NEW_ANECDOTE",
    data: await anecdoteService.createNew(anecdote),
  });

export const updateAnecdote = (anecdote) => async (dispatch) =>
  dispatch({
    type: "UPDATE_ANECDOTE",
    data: await anecdoteService.update(anecdote),
  });

export default reducer;

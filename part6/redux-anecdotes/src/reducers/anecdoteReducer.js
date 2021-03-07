import anecdoteService from "../services/anecdotes";

const orderByVotes = (anecdotes) => anecdotes.sort((a, b) => b.votes - a.votes);

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.data;
    case "VOTE":
      return orderByVotes(
        state.map((anecdote) => ({
          ...anecdote,
          votes:
            anecdote.id === action.data.id
              ? anecdote.votes + 1
              : anecdote.votes,
        }))
      );
    case "NEW_ANECDOTE":
      return orderByVotes([action.data, ...state]);
    default:
      return state;
  }
};

export const voteAnecdote = (id) => ({
  type: "VOTE",
  data: { id },
});

export const addAnecdote = (anecdote) => ({
  type: "NEW_ANECDOTE",
  data: anecdote,
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export default reducer;

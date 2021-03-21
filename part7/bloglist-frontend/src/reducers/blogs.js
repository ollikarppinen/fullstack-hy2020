const initialState = {
  blogs: [],
};

const sortByLikes = (blogs) => blogs.sort((a, b) => b.likes - a.likes);

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BLOGS":
      return {
        ...state,
        blogs: sortByLikes(action.blogs),
      };
    case "ADD_BLOG":
      return {
        ...state,
        blogs: sortByLikes([...state.blogs, action.blog]),
      };
    case "UPDATE_BLOG":
      return {
        ...state,
        blogs: sortByLikes(
          state.blogs.map((blog) =>
            blog.id === action.blog.id ? action.blog : blog
          )
        ),
      };
    case "REMOVE_BLOG":
      return {
        ...state,
        blogs: sortByLikes(
          state.blogs.filter(({ id }) => id !== action.blog.id)
        ),
      };
    default:
      return state;
  }
};

const setBlogsAction = (blogs) => ({
  type: "SET_BLOGS",
  blogs,
});

const addBlogAction = (blog) => ({ type: "ADD_BLOG", blog });

const updateBlogAction = (blog) => ({ type: "UPDATE_BLOG", blog });

const removeBlogAction = (blog) => ({ type: "REMOVE_BLOG", blog });

export const getAllBlogs = (blogsService) => (dispatch) =>
  blogsService.getAll().then((blogs) => dispatch(setBlogsAction(blogs)));

export const createBlog = (blogsService, blog) => (dispatch) =>
  blogsService.create(blog).then((blog) => dispatch(addBlogAction(blog)));

export const updateBlog = (blogsService, blog) => (dispatch) =>
  blogsService.put(blog).then((blog) => dispatch(updateBlogAction(blog)));

export const removeBlog = (blogsService, blog) => (dispatch) =>
  blogsService.remove(blog).then(() => dispatch(removeBlogAction(blog)));

export default blogsReducer;

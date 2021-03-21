import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useBlogsService } from "../hooks/index";
import { useUsersService } from "../hooks/index";
import { getAllUsers } from "../reducers/users";
import { updateBlog, removeBlog, getAllBlogs } from "../reducers/blogs";
import { handleError } from "../reducers/messages";

import NoMatch from "./NoMatch";

const BlogDetails = () => {
  const dispatch = useDispatch();

  const blogsService = useBlogsService();
  const usersService = useUsersService();

  const blogs = useSelector(({ blogs: { blogs } }) => blogs);
  const users = useSelector(({ users: { users } }) => users);

  useEffect(() => {
    if (!blogs.length) dispatch(getAllBlogs(blogsService));
  }, [blogs]);

  useEffect(() => {
    if (!users.length) dispatch(getAllUsers(usersService));
  }, [users]);

  const id = useParams().id;
  const blog = blogs.find((user) => user.id === id);
  const user = blog ? users.find(({ id }) => id === blog.user) : null;

  const handleBlogRemove = (blog) =>
    dispatch(handleError(removeBlog(blogsService, blog)));

  const handleBlogLike = (blog) =>
    dispatch(
      handleError(
        updateBlog(blogsService, {
          ...blog,
          likes: blog.likes + 1,
        })
      )
    );

  const onBlogRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleBlogRemove(blog);
    }
  };

  if (!blog) return <NoMatch />;

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{" "}
        <button onClick={() => handleBlogLike(blog)}>like</button>
      </div>
      <div>added by {user ? user.name : "?"}</div>
      <button onClick={onBlogRemove}>remove</button>
    </div>
  );
};

export default BlogDetails;

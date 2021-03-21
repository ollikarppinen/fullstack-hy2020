import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useBlogsService } from "../hooks/index";
import { showMessage, handleError } from "../reducers/messages";
import { createBlog, updateBlog, removeBlog } from "../reducers/blogs";

import Notification from "./Notification";
import LogoutForm from "./LogoutForm";
import Blog from "./Blog";
import Togglable from "./Togglable";
import NewBlogForm from "./NewBlogForm";

const BlogList = () => {
  const dispatch = useDispatch();

  const blogsService = useBlogsService();

  const blogFormRef = useRef();

  const blogs = useSelector(({ blogs: { blogs } }) => blogs);

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

  const handleBlogCreate = (newBlog) => {
    dispatch(handleError(createBlog(blogsService, newBlog)));
    blogFormRef.current.toggleVisibility();
    dispatch(
      showMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    );
  };
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <LogoutForm />
      <Togglable
        showButtonLabel="new note"
        hideButtonLabel="cancel"
        ref={blogFormRef}
      >
        <NewBlogForm createBlog={handleBlogCreate} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={handleBlogLike}
            removeBlog={handleBlogRemove}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;

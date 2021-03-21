import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useBlogsService } from "../hooks/index";
import { showMessage, handleError } from "../reducers/messages";
import { createBlog, getAllBlogs } from "../reducers/blogs";

import Togglable from "./Togglable";
import NewBlogForm from "./NewBlogForm";

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,

  marginBottom: 5,
};

const BlogList = () => {
  const dispatch = useDispatch();

  const blogsService = useBlogsService();

  const blogFormRef = useRef();

  const blogs = useSelector(({ blogs: { blogs } }) => blogs);

  useEffect(() => {
    dispatch(getAllBlogs(blogsService));
  }, []);

  const handleBlogCreate = (newBlog) => {
    dispatch(handleError(createBlog(blogsService, newBlog)));
    blogFormRef.current.toggleVisibility();
    dispatch(
      showMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    );
  };
  return (
    <>
      <h2>Blogs</h2>
      <Togglable
        showButtonLabel="new blog"
        hideButtonLabel="cancel"
        ref={blogFormRef}
      >
        <NewBlogForm createBlog={handleBlogCreate} />
      </Togglable>
      <div>
        {blogs.map((blog) => (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogList;

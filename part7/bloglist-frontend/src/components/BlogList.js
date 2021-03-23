import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

import { useBlogsService } from "../hooks/index";
import { showMessage, handleError } from "../reducers/messages";
import { createBlog, getAllBlogs } from "../reducers/blogs";

import Togglable from "./Togglable";
import NewBlogForm from "./NewBlogForm";

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
      <Togglable
        showButtonLabel="new blog"
        hideButtonLabel="cancel"
        ref={blogFormRef}
      >
        <NewBlogForm createBlog={handleBlogCreate} />
      </Togglable>
      <ListGroup>
        {blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default BlogList;

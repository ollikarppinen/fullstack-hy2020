import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";

import {
  useBlogsService,
  useUsersService,
  useBlogCommentsService,
} from "../hooks/index";
import { getAllUsers } from "../reducers/users";
import {
  updateBlog,
  removeBlog,
  getAllBlogs,
  createComment,
} from "../reducers/blogs";
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
    <>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes{" "}
        <Button onClick={() => handleBlogLike(blog)}>like</Button>
      </div>
      <div>added by {user ? user.name : "?"}</div>
      <Button onClick={onBlogRemove}>remove</Button>
      <Comments blog={blog} />
    </>
  );
};

const Comments = ({ blog }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const blogCommentsService = useBlogCommentsService(blog);

  const handleCreateComment = () =>
    dispatch(handleError(createComment(blogCommentsService, { text })));

  const { comments } = blog;
  return (
    <>
      <h3>comments</h3>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <Button onClick={handleCreateComment}>add comment</Button>
      <ul>{comments.map(Comment)}</ul>
    </>
  );
};

const Comment = ({ id, text }) => <li key={id}>{text}</li>;

export default BlogDetails;

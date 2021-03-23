import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Button,
  ListGroup,
  Card,
  InputGroup,
  FormControl,
} from "react-bootstrap";

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
      <Card>
        <Card.Header as="h1">
          {blog.title} {blog.author}
        </Card.Header>
        <Card.Body>
          {blog.likes} likes{" "}
          <Button onClick={() => handleBlogLike(blog)}>like</Button>
          <p>added by {user ? user.name : "?"}</p>
          <Card.Link href={blog.url}>{blog.url}</Card.Link>
        </Card.Body>

        <Card.Body>
          <Button onClick={onBlogRemove}>remove</Button>
        </Card.Body>
        <Card.Body>
          <Comments blog={blog} />
        </Card.Body>
      </Card>
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
    <div>
      <h3>{comments.length ? "comments" : "no comments yet"}</h3>
      <ListGroup>{comments.map(Comment)}</ListGroup>
      <InputGroup className="mb-3">
        <FormControl
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-describedby="basic-addon1"
        />
        <InputGroup.Prepend>
          <Button onClick={handleCreateComment}>add comment</Button>
        </InputGroup.Prepend>
      </InputGroup>
    </div>
  );
};

const Comment = ({ id, text }) => (
  <ListGroup.Item key={id}>{text}</ListGroup.Item>
);

export default BlogDetails;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Container } from "react-bootstrap";

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const onBlogCreate = async (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={onBlogCreate}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control
            id="title"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author</Form.Label>
          <Form.Control
            id="author"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url</Form.Label>
          <Form.Control
            id="url"
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button id="submit-new-blog" type="submit">
          create
        </Button>
      </Form>
    </div>
  );
};

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default NewBlogForm;

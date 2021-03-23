import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Blog = ({ blog, removeBlog, likeBlog }) => {
  const { title, author, url, likes } = blog;
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,

    marginBottom: 5,
  };

  const blogDetails = () => (
    <div>
      <div>{url}</div>
      <div>
        {likes}
        <Button
          id="like-blog-button"
          className="likeButton"
          onClick={() => likeBlog(blog)}
        >
          like
        </Button>
      </div>
      <div>{author}</div>
      <Button id="remove-blog-button" onClick={onBlogRemove}>
        remove
      </Button>
    </div>
  );

  const onBlogRemove = () => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      removeBlog(blog);
    }
  };

  return (
    <div style={blogStyle} className="blog">
      {title} {author}
      <Button
        className="showDetailsButton"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "hide" : "view"}
      </Button>
      {showDetails && blogDetails()}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }),
  removeBlog: PropTypes.func.isRequired,
  likeBlog: PropTypes.func.isRequired,
};

export default Blog;

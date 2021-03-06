const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("comments");
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({ likes: 0, ...request.body, user: user._id });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(blog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(403).json({ error: "only creator can delete blog" });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;
  const blog = await Blog.findByIdAndUpdate(
    { _id: request.params.id },
    { title, author, url, likes },
    { new: true }
  ).populate("comments");
  response.status(200).json(blog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);
  const comment = new Comment({
    ...request.body,
    user: user._id,
    blog: blog._id,
  });

  const savedComment = await comment.save();
  user.comments = user.comments.concat(savedComment._id);
  await user.save();
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();

  // Seems dumb
  const blogWithComments = await Blog.findById(request.params.id).populate(
    "comments"
  );
  response.status(201).json(blogWithComments);
});

module.exports = blogsRouter;

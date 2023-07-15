import Post from "../models/Post.js";
import User from "../models/user.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath, picture } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath: picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find(); // get all posts( now updated with the newly created post)
    res.status(200).json(post);
  } catch (err) {
    res.status(409).json({
      msg: err.message,
    });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const feedPosts = await Post.find();
    res.status(200).json(feedPosts);
  } catch (err) {
    res.status(404).json({
      msg: err.message,
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await Post.find({ userId: userId });
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(404).json({
      msg: err.message,
    });
  }
};

export const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { postUserId, user, text } = req.body;
    const findPost = await Post.findById(id);
    console.log(text);
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        comments: [...findPost.comments, text],
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({
      msg: err.message,
    });
  }
};

export const getSmth = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({
      msg: err.message,
    });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({
      msg: err.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const p = await Post.findById(id);
    console.log(p);
    const post = await Post.findByIdAndDelete(id);
    console.log(post);
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(404).json({ msg: err.message });
  }
};

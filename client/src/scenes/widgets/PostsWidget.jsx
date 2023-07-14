import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const getAllPosts = async () => {
    const resp = await fetch(`http://localhost:3001/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const feedPosts = await resp.json();
    dispatch(setPosts({ posts: feedPosts }));
  };
  const getUserPosts = async () => {
    const resp = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const userPosts = await resp.json();
    dispatch(setPosts({ posts: userPosts }));
  };
  useEffect(() => {
    try {
      if (isProfile) {
        getUserPosts();
      } else {
        getAllPosts();
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;

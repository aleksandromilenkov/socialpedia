import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: { firstName: "Anton", lastName: "Nenw" },
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setMode: (state) => {
      // with toolkit you can directly modify the state
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User friends does not exists");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts?.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }
        return post;
      });
      state.posts = updatedPosts;
    },
    deletePost: (state, action) => {
      console.log(action.payload.id);
      const updatedPosts = state.posts?.filter(
        (post) => post._id !== action.payload.id
      );
      state.posts = updatedPosts;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  deletePost,
} = authSlice.actions;
export default authSlice.reducer;

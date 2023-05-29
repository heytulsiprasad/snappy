import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    setTweets: (state, action) => {
      state = action.payload;
    },
    addTweet: (state, action) => {
      state.push(action.payload);
    },
    removeTweet: (state, action) => {
      state = state.filter((post) => post._id !== action.payload);
    },
    updateTweet: (state, action) => {
      const index = state.findIndex((post) => post._id === action.payload._id);

      state[index] = action.payload;
    },
  },
});

export const { setTweets, addTweet, removeTweet, updateTweet } =
  tweetSlice.actions;

export default tweetSlice.reducer;

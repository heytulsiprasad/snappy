import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allTweets: [],
  totalTweets: 0,
};

const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    setTweets: (state, action) => {
      state.allTweets = action.payload;
      state.totalTweets = action.payload.length;
    },
    addTweet: (state, action) => {
      state.allTweets.push(action.payload);
    },
    removeTweet: (state, action) => {
      state.allTweets = state.allTweets.filter(
        (tweet) => tweet._id !== action.payload
      );
    },
    updateTweet: (state, action) => {
      const index = state.allTweets.findIndex(
        (tweet) => tweet._id === action.payload._id
      );
      state.allTweets[index] = action.payload;
    },
  },
});

export const { setTweets, addTweet, removeTweet, updateTweet } =
  tweetSlice.actions;

export default tweetSlice.reducer;

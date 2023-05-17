import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload.currentUser;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    // set currentUser
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload.currentUser;
    },
    setProfileImage: (state, action) => {
      state.currentUser.image = action.payload.image;
    },
    setProfile: (state, action) => {
      state.currentUser.profile = {
        ...state.currentUser.profile,
        ...action.payload.profile,
      };
    },
    acceptFriendRequest: (state, action) => {
      state.currentUser.profile.friends.push(action.payload.friend);
      state.currentUser.profile.friendRequests =
        state.currentUser.profile.friendRequests.filter(
          (friend) => friend != action.payload.friend
        );
    },
    declineFriendRequest: (state, action) => {
      state.currentUser.profile.friendRequests =
        state.currentUser.profile.friendRequests.filter(
          (friend) => friend != action.payload.friend
        );
    },
  },
});

export const {
  login,
  logout,
  setCurrentUser,
  setProfileImage,
  setProfile,
  acceptFriendRequest,
  declineFriendRequest,
} = authSlice.actions;

export default authSlice.reducer;

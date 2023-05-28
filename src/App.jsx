import { MantineProvider, Text } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// Components
import New from "./pages/New";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import EditProfile from "./pages/EditProfile";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import FriendRequests from "./pages/FriendRequests";
import Navbar from "./components/Navbar";

// Styles
import { Wrapper, ContentWrapper } from "./styles/App.styles";

// Assets
import logo from "./assets/instagram.svg";

// Utils & Reducers
import { login } from "./features/auth/authSlice";
import { getUserInfo } from "./utils/helpers";
import axios from "axios";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getUserInfo(dispatch, login);
    }
  }, [isAuthenticated, dispatch]);

  // Interceptor for all API calls
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        // config.headers["x-auth-token"] = token;
        axios.defaults.headers.common["x-auth-token"] = token;
      } else {
        delete axios.defaults.headers.common["x-auth-token"];
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <MantineProvider
      theme={{
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Notifications />
      <Wrapper>
        <Navbar />
        <ContentWrapper>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Posts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/post/:postId"
              element={
                <ProtectedRoute>
                  <Post />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/friend-requests"
              element={
                <ProtectedRoute>
                  <FriendRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <Explore />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new"
              element={
                <ProtectedRoute>
                  <New />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Login />
                </GuestRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Register />
                </GuestRoute>
              }
            />
          </Routes>
        </ContentWrapper>
        <Footer />
      </Wrapper>
    </MantineProvider>
  );
}

export default App;

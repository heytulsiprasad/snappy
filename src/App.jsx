import { MantineProvider, Text } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// Components
import New from "./components/New";
import Footer from "./components/Footer";
import ProfileTag from "./components/ProfileTag";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import EditProfile from "./components/EditProfile";
import Posts from "./components/Posts";
import Post from "./components/Post";

// Styles
import {
  Wrapper,
  Navbar,
  NavHead,
  NavItem,
  ImageBox,
  ContentWrapper,
  NavItemsBox,
} from "./styles/App.styles";

// Assets
import logo from "./assets/instagram.svg";

// Utils & Reducers
import { login } from "./features/auth/authSlice";
import { getUserInfo } from "./utils/helpers";
import axios from "axios";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.currentUser);
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
      withGlobalStyles
      theme={{
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      <Notifications />
      <Wrapper>
        <Navbar>
          <ul>
            <div>
              <li>
                <NavHead to="/">
                  <ImageBox>
                    <img src={logo} alt="logo" />
                  </ImageBox>
                  <Text fz="xl" fw="600" ml="xs">
                    Snappy
                  </Text>
                </NavHead>
              </li>
            </div>
            <NavItemsBox>
              <li>
                <NavItem to="/new">New</NavItem>
              </li>
              <li>
                <NavItem to="/">Posts</NavItem>
              </li>
              <li>
                {!isAuthenticated ? (
                  <NavItem to="/login">Login</NavItem>
                ) : (
                  <ProfileTag
                    name={currentUser.name}
                    email={currentUser.email}
                    profileImg={currentUser?.image}
                  />
                )}
              </li>
            </NavItemsBox>
          </ul>
        </Navbar>
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

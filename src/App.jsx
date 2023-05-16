import { MantineProvider, Text } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

// Components
import Home from "./components/Home";
import Bookmarks from "./components/Bookmarks";
import Footer from "./components/Footer";
import ProfileTag from "./components/ProfileTag";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import Profile from "./components/Profile";

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
                <NavItem to="/">Explore</NavItem>
              </li>
              <li>
                <NavItem to="/bookmarks">Bookmarks</NavItem>
              </li>
              <li>
                {!isAuthenticated ? (
                  <NavItem to="/login">Login</NavItem>
                ) : (
                  <ProfileTag
                    name={currentUser.name}
                    email={currentUser.email}
                    profileImg={currentUser?.profile?.image}
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
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <ProtectedRoute>
                  <Bookmarks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <Profile />
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

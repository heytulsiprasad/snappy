import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

// Components
import Home from "./components/Home";
import Bookmarks from "./components/Bookmarks";
import Footer from "./components/Footer";
import ProfileTag from "./components/ProfileTag";
import Login from "./components/Login";
import Register from "./components/Register";

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

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.currentUser);

  console.log({ isAuthenticated, currentUser });

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Wrapper>
        <Navbar>
          <ul>
            <div>
              <li>
                <NavHead to="/">
                  <ImageBox>
                    <img src={logo} alt="logo" />
                  </ImageBox>
                  <h2>Snappy</h2>
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
                  <NavItem to="/auth">Login</NavItem>
                ) : (
                  <ProfileTag
                    name={currentUser.name}
                    email={currentUser.email}
                    profileImg={currentUser.profileImg}
                  />
                )}
              </li>
            </NavItemsBox>
          </ul>
        </Navbar>
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ContentWrapper>
        <Footer />
      </Wrapper>
    </MantineProvider>
  );
}

export default App;

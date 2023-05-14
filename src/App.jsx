import { MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";

// Components
import Home from "./components/Home";
import Bookmarks from "./components/Bookmarks";
import Footer from "./components/Footer";

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
                  <h1>Snappy</h1>
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
            </NavItemsBox>
          </ul>
        </Navbar>
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </ContentWrapper>
        <Footer />
      </Wrapper>
    </MantineProvider>
  );
}

export default App;

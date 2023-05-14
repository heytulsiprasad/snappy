import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
`;

export const Navbar = styled.nav`
  display: flex;
  background: #eee;
  padding: 2rem 2rem;

  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
  }
`;

export const NavHead = styled(Link)`
  display: flex;
  align-items: center;
`;

export const NavItem = styled(Link)`
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: #000;
  font-weight: 500;
  font-size: 1.4rem;
`;

export const NavItemsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  li {
    margin-left: 1rem;
  }
`;

export const ImageBox = styled.div`
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

// Use of semantic HTML elements
export const ContentWrapper = styled.main`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

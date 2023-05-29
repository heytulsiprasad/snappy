import styled from "styled-components";
import logo from "../assets/tweeter.svg";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { AiFillSetting } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { useClickOutside } from "@mantine/hooks";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { logout } from "../features/auth/authSlice";

const Wrapper = styled.nav`
  padding: 1.25rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  position: relative;
`;

const NavOptions = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  color: #828282;

  ul {
    display: flex;
    list-style: none;
    gap: 4rem;
  }
`;

const NavItem = styled.li`
  cursor: pointer;

  a {
    color: ${({ active }) => (active ? "#2f80ed" : "#828282")};
  }
`;

const NavProfile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;

  .image-container {
    img {
      display: block;
      border-radius: 5px;
      width: 2rem;
      height: 2rem;
      object-fit: cover;
    }
  }

  .username {
    font-weight: 700;
    font-size: 12px;
  }

  .dropdown-arrow {
    display: block;
    margin-top: 5px;
  }
`;

const DropdownWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  padding: 1rem;
  position: absolute;
  top: 5.5rem;
  right: 2rem;
  font-weight: 500;
  font-size: 1.2rem;
  color: #4f4f4f;
  font-family: "Noto Sans", sans-serif;

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const DropdownItem = styled.li`
  a {
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: flex-start;
    cursor: pointer;

    :hover {
      background: #f2f2f2;
      border-radius: 8px;
    }
  }
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home"); // home, explore, bookmarks
  const location = useLocation();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dropdownRef = useClickOutside(() => setOpen(false));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    // Clear state
    dispatch(logout());

    // Remove token from localstorage
    localStorage.removeItem("token");

    // Navigate to login
    navigate("/login");
  };

  useEffect(() => {
    if (location.pathname.includes("explore")) {
      setActive("explore");
    } else if (location.pathname.includes("bookmarks")) {
      setActive("bookmarks");
    } else {
      setActive("home");
    }
  }, [location.pathname]);

  console.log({ active, pathname: location.pathname });
  return (
    <Wrapper>
      <div>
        <img src={logo} alt="App logo" />
      </div>
      {isAuth && (
        <NavOptions>
          <ul>
            <NavItem active={active === "home"}>
              <Link to="/">Home</Link>
            </NavItem>
            <NavItem active={active === "explore"}>
              <Link to="/explore">Explore</Link>
            </NavItem>
            <NavItem active={active === "bookmarks"}>
              <Link to="/bookmarks">Bookmarks</Link>
            </NavItem>
          </ul>
        </NavOptions>
      )}
      {isAuth ? (
        <NavProfile onClick={() => setOpen(true)}>
          {/* Profile dropdown */}
          <div className="image-container">
            <img src={currentUser.image} alt="Profile picture" />
          </div>
          <div className="username">
            <h4>{currentUser.name}</h4>
          </div>
          <div className="dropdown-arrow">
            {!open ? <RiArrowDownSFill /> : <RiArrowUpSFill />}
          </div>
        </NavProfile>
      ) : (
        <div>
          <Link to="/login">Login</Link>
        </div>
      )}
      {open && (
        <DropdownWrapper ref={dropdownRef}>
          <ul>
            <DropdownItem>
              <Link to={`/profile/${currentUser._id}`}>
                <CgProfile />
                <h6>My Profile</h6>
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link to={`/profile/edit`}>
                <AiFillSetting />
                <h6>Settings</h6>
              </Link>
            </DropdownItem>
            <DropdownItem>
              <Link to="/" onClick={logoutHandler}>
                <IoLogOutOutline color="#EB5757" />
                <h6 style={{ color: "#EB5757" }}>Logout</h6>
              </Link>
            </DropdownItem>
          </ul>
        </DropdownWrapper>
      )}
    </Wrapper>
  );
};

export default Navbar;

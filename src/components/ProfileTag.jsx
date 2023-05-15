import { Avatar, Box, Text } from "@mantine/core";
import PropTypes from "prop-types";
import nameInitials from "name-initials";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../features/auth/authSlice";

const ProfileTag = ({ name, email, profileImg }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    // Clear state
    dispatch(logout());

    // Remove token from localstorage
    localStorage.removeItem("token");

    // Navigate to login
    navigate("/login");
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => setOpen(!open)}
      >
        {profileImg ? (
          <Avatar src={profileImg} alt={name} />
        ) : (
          <Avatar color="cyan" radius="xl">
            {nameInitials(name)}
          </Avatar>
        )}
        <Box ml="sm">
          <Text fz="sm">{name}</Text>
          <Text fz="xs">{email}</Text>
        </Box>
      </Box>
      {open && (
        <Box
          sx={{
            position: "absolute",
            top: "180%",
            right: 0,
            background: "#edecec",
            padding: "0.5rem",
            borderRadius: "1rem",
            width: "10rem",
            zIndex: 1,
          }}
        >
          <Option onClick={onLogout}>Logout</Option>
          <Option onClick={() => navigate("/profile")}>Profile</Option>
        </Box>
      )}
    </Box>
  );
};

const Option = ({ children, ...rest }) => (
  <Box
    sx={{
      cursor: "pointer",
      padding: "0.5rem",
      borderRadius: "0.5rem",
      "&:hover": {
        background: "#dcdcdc",
      },
    }}
    {...rest}
  >
    <Text>{children}</Text>
  </Box>
);

Option.propTypes = {
  children: PropTypes.node.isRequired,
};

ProfileTag.propTypes = {
  profileImg: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ProfileTag;

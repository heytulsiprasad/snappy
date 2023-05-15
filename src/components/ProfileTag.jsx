import { Avatar, Box, Stack, Text } from "@mantine/core";
import PropTypes from "prop-types";
import nameInitials from "name-initials";

const ProfileTag = ({ name, email, profileImg }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
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
  );
};

ProfileTag.propTypes = {
  profileImg: PropTypes.string,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ProfileTag;

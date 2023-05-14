import { Avatar } from "@mantine/core";
import PropTypes from "prop-types";

const ProfileTag = ({ profileImg, profileName }) => {
  return (
    <div>
      <Avatar src={profileImg} alt={profileName}>
        MK
      </Avatar>
    </div>
  );
};

ProfileTag.propTypes = {
  profileImg: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
};

export default ProfileTag;

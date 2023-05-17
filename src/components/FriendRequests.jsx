import { Box, Group, Stack, Title, Image, Text, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PropTypes from "prop-types";
import { notifications } from "@mantine/notifications";
import {
  acceptFriendRequest,
  declineFriendRequest,
} from "../features/auth/authSlice";

const FriendRequests = () => {
  const dispatch = useDispatch();
  const friendRequests = useSelector(
    (state) => state.auth.currentUser?.profile?.friendRequests
  );

  const handleAcceptRequest = async (userId) => {
    try {
      const res = await axios.put(
        `/api/profile/accept-friend-request/${userId}`
      );
      console.log(res.data);
      dispatch(acceptFriendRequest({ friend: userId }));

      // Notify user upon success
      notifications.show({
        title: "Friend request accepted",
        message: "You are now friends with this user",
        color: "cyan",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeclineRequest = async (userId) => {
    try {
      const res = await axios.put(
        `/api/profile/reject-friend-request/${userId}`
      );
      console.log(res.data);
      dispatch(declineFriendRequest({ friend: userId }));

      // Notify user upon success
      notifications.show({
        title: "Friend request declined",
        message: "You have declined this user's friend request",
        color: "red",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Title order={3}>Friend Requests</Title>
      <Title order={6}>Total: {friendRequests.length}</Title>
      <Stack mt="xl">
        {friendRequests.map((userId) => (
          <ProfileCard
            key={userId}
            userId={userId}
            handleAcceptRequest={handleAcceptRequest}
            handleDeclineRequest={handleDeclineRequest}
          />
        ))}
      </Stack>
    </Box>
  );
};

const ProfileCard = ({ userId, handleAcceptRequest, handleDeclineRequest }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async (userId) => {
      const res = await axios.get(`/api/user/${userId}`);
      console.log(res.data);
      setUser(res.data.user);
    };

    if (userId) fetchUser(userId);
  }, [userId]);

  return (
    <Box>
      {user && (
        <Group
          grow
          sx={{
            border: "1px solid #bebebe",
            padding: "1rem 2rem",
            borderRadius: "5px",
          }}
          spacing="xl"
        >
          <Group sx={{ maxWidth: "100%" }}>
            <Image src={user.image} height={100} width={100} radius="xl" />
            <Stack>
              <Text fz="lg" fw="bold" color="cyan">
                {user.name}
              </Text>
              <Text fz="md" color="cyan">
                {user.email}
              </Text>
            </Stack>
          </Group>
          <Stack w="10rem">
            <Button
              variant="outline"
              color="green"
              compact
              onClick={() => handleAcceptRequest(userId)}
            >
              Accept Request
            </Button>
            <Button
              variant="outline"
              color="red"
              compact
              onClick={() => handleDeclineRequest(userId)}
            >
              Decline Request
            </Button>
          </Stack>
        </Group>
      )}
    </Box>
  );
};

ProfileCard.propTypes = {
  userId: PropTypes.string.isRequired,
  handleAcceptRequest: PropTypes.func.isRequired,
  handleDeclineRequest: PropTypes.func.isRequired,
};

export default FriendRequests;

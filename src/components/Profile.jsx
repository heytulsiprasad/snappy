import { Box, Title, Image, Group, Stack, Text, Button } from "@mantine/core";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  AiFillGithub,
  AiFillFacebook,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillInstagram,
} from "react-icons/ai";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const currentUserId = useSelector((state) => state.auth.currentUser._id);

  // Fetch user info upon component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user/${userId}`);
        console.log(res.data);
        setUser(res.data.user);
      } catch (e) {
        console.error(e);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <Box sx={{ padding: "2rem" }}>
      {user && (
        <Box>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              background: "linear-gradient(115deg, #f9ce34, #ee2a7b, #6228d7);",
              padding: "2.5rem 2rem",
              borderRadius: "1rem",
            }}
          >
            <Box>
              <Image
                src={user.image}
                alt={user.name}
                width={175}
                height={175}
                radius="5rem"
              />
            </Box>
            <Title order={2} mt="xl" color="white">
              {user.name}
            </Title>
            <Title order={6} color="white">
              {user?.profile?.bio || user.email}
            </Title>
            <Group>
              {user._id === currentUserId && (
                <Button
                  variant="light"
                  color="white"
                  compact
                  onClick={() => navigate("/profile/edit")}
                >
                  Edit profile
                </Button>
              )}
              {user._id !== currentUserId && (
                <Button variant="light" color="white" compact>
                  Send Friend Request
                </Button>
              )}
              {user._id !== currentUserId &&
                user.profile.friends.includes(currentUserId) && (
                  <Button variant="light" color="white" compact>
                    Unfriend
                  </Button>
                )}
            </Group>
            <Group>
              {user?.profile?.githublink && (
                <a
                  href={user?.profile?.githublink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillGithub size="2rem" color="white" />
                </a>
              )}

              {user?.profile?.facebooklink && (
                <a
                  href={user?.profile?.facebooklink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillFacebook size="2rem" color="white" />
                </a>
              )}

              {user?.profile?.twitterlink && (
                <a
                  href={user?.profile?.twitterlink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiOutlineTwitter size="2rem" color="white" />
                </a>
              )}

              {user?.profile?.linkedinlink && (
                <a
                  href={user?.profile?.linkedinlink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillLinkedin size="2rem" color="white" />
                </a>
              )}

              {user?.profile?.instagramlink && (
                <a
                  href={user?.profile?.instagramlink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiFillInstagram size="2rem" color="white" />
                </a>
              )}
            </Group>
          </Stack>
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#dcdcdc",
              padding: "4rem 2rem",
              marginTop: "2rem",
              borderRadius: "1rem",
            }}
          >
            <Title order={4}>Personal Details</Title>
            <Stack>
              <Stack align="center" spacing="0">
                <Text color="#606060" fw="500">
                  Bio
                </Text>
                <Text color="#8d8d8d" fw="400">
                  {user?.profile?.bio || "No bio"}
                </Text>
              </Stack>
              <Stack align="center" spacing="0">
                <Text color="#606060" fw="500">
                  Company
                </Text>
                <Text color="#8d8d8d" fw="400">
                  {user?.profile?.company || "No company"}
                </Text>
              </Stack>
              <Stack align="center" spacing="0">
                <Text color="#606060" fw="500">
                  Date of Birth
                </Text>
                <Text color="#8d8d8d" fw="400">
                  {dayjs(user?.profile?.dateOfBirth).format("DD MMM YYYY") ||
                    "No date of birth"}
                </Text>
              </Stack>
              <Stack align="center" spacing="0">
                <Text color="#606060" fw="500">
                  Gender
                </Text>
                <Text color="#8d8d8d" fw="400">
                  {user?.profile?.gender || "Didn't specify"}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Profile;

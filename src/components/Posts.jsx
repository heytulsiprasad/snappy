import { Box, Group, Stack, Title, Text, Image, Button } from "@mantine/core";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, updatePost } from "../features/posts/postSlice";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import dayjs from "dayjs";

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const currentUserId = useSelector((state) => state.auth.currentUser._id);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/posts");
        dispatch(setPosts(res.data));
      } catch (e) {
        console.error(e);
      }
    };

    fetchPosts();
  }, [dispatch]);

  const handleLike = async (postId) => {
    try {
      const res = await axios.post(`/api/posts/like/${postId}`);
      console.log(res.data);
      dispatch(updatePost(res.data.post));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDislike = async (postId) => {
    try {
      const res = await axios.post(`/api/posts/unlike/${postId}`);
      console.log(res.data);
      dispatch(updatePost(res.data.post));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Title order={2}>Posts</Title>
      <Stack spacing="xl" mt="xl">
        {posts.map((post) => (
          <Group
            key={post._id}
            sx={{
              border: "1px solid #d5d5d5",
              padding: "1rem 2rem",
              borderRadius: "5px",
              justifyContent: "space-between",
            }}
          >
            <Group>
              {post.image ? (
                <Box>
                  <Image
                    src={post.image}
                    maw={150}
                    radius="md"
                    withPlaceholder
                  />
                </Box>
              ) : (
                <Box w={150}></Box>
              )}
              <Group>
                <Stack sx={{ justifyContent: "space-between" }}>
                  <Box>
                    <Text>{post.content}</Text>
                  </Box>
                  <Box>
                    <Text color="gray" fz="sm">
                      Created at: {dayjs(post.createdAt).format("DD MMM YYYY")}
                    </Text>
                    <Group>
                      <Text color="cyan" fw="600" fs="italic" fz="sm">
                        Posted by: {post.author.name}
                      </Text>
                      <Image
                        src={post.author.image}
                        height={20}
                        width={20}
                        radius="xl"
                      />
                    </Group>
                  </Box>
                </Stack>
              </Group>
            </Group>
            <Stack>
              <Box
                sx={{
                  border: "2px solid #feb2b2",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={
                  post.likes.includes(currentUserId)
                    ? () => handleDislike(post._id)
                    : () => handleLike(post._id)
                }
              >
                {post.likes.includes(currentUserId) ? (
                  <AiFillHeart size="20px" color="#feb2b2" />
                ) : (
                  <AiOutlineHeart size="20px" color="#feb2b2" />
                )}
              </Box>
              <Box>
                <Button variant="light" compact>
                  Comment
                </Button>
              </Box>
            </Stack>
          </Group>
        ))}
      </Stack>
    </Box>
  );
}

export default Posts;

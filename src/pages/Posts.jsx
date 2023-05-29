// import { Box, Group, Stack, Title, Text, Image, Button } from "@mantine/core";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   removePost,
//   setPosts,
//   updatePost,
// } from "../features/tweets/tweetSlice";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";
// import { notifications } from "@mantine/notifications";

// function Posts() {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.tweets.posts);
//   const currentUserId = useSelector((state) => state.auth.currentUser._id);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await axios.get("/api/posts");
//         dispatch(setPosts(res.data));
//       } catch (e) {
//         console.error(e);
//       }
//     };

//     fetchPosts();
//   }, [dispatch]);

//   const handleLike = async (postId) => {
//     try {
//       const res = await axios.post(`/api/posts/like/${postId}`);
//       console.log(res.data);
//       dispatch(updatePost(res.data.post));
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const handleDislike = async (postId) => {
//     try {
//       const res = await axios.post(`/api/posts/unlike/${postId}`);
//       console.log(res.data);
//       dispatch(updatePost(res.data.post));
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   const handleDeletePost = async (postId) => {
//     try {
//       const res = await axios.delete(`/api/posts/${postId}`);
//       console.log(res.data);
//       dispatch(removePost(postId));

//       // Notify user upon delete success
//       notifications.show({
//         title: "Post deleted",
//         message: "Your post has been deleted successfully",
//         color: "red",
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <Box sx={{ padding: "2rem" }}>
//       <Title order={2}>Posts</Title>
//       <Stack spacing="xl" mt="xl">
//         {posts.map((post) => (
//           <Group
//             key={post._id}
//             id="post-container"
//             grow
//             sx={{
//               border: "1px solid #d5d5d5",
//               padding: "1rem 2rem",
//               borderRadius: "5px",
//               justifyContent: "space-between",
//             }}
//           >
//             <Group
//               id="image-and-text-container"
//               grow
//               sx={{
//                 maxWidth: "100%",
//               }}
//             >
//               {post.image ? (
//                 <Box sx={{ maxWidth: "150px" }}>
//                   <Image
//                     src={post.image}
//                     maw={150}
//                     radius="md"
//                     withPlaceholder
//                   />
//                 </Box>
//               ) : (
//                 <Box maw={150}></Box>
//               )}
//               <Group sx={{ maxWidth: "100%" }}>
//                 <Stack sx={{ justifyContent: "space-between" }}>
//                   <Box>
//                     <Text>{post.content}</Text>
//                   </Box>
//                   <Box>
//                     <Text color="gray" fz="sm">
//                       Created at: {dayjs(post.createdAt).format("DD MMM YYYY")}
//                     </Text>
//                     <Group
//                       sx={{ cursor: "pointer" }}
//                       onClick={() => navigate(`/profile/${post.author._id}`)}
//                     >
//                       <Text color="cyan" fw="600" fs="italic" fz="sm">
//                         Posted by: {post.author.name}
//                       </Text>
//                       <Image
//                         src={post.author.image}
//                         height={20}
//                         width={20}
//                         radius="xl"
//                       />
//                     </Group>
//                   </Box>
//                 </Stack>
//               </Group>
//             </Group>
//             <Stack
//               id="like-and-comment-container"
//               sx={{
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 maxWidth: "10rem",
//               }}
//             >
//               <Group
//                 sx={{
//                   border: "2px solid #fb6e6e",
//                   padding: "10px",
//                   borderRadius: "10px",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   cursor: "pointer",
//                 }}
//                 onClick={
//                   post.likes.includes(currentUserId)
//                     ? () => handleDislike(post._id)
//                     : () => handleLike(post._id)
//                 }
//               >
//                 {post.likes.includes(currentUserId) ? (
//                   <AiFillHeart size="20px" color="#fb6e6e" />
//                 ) : (
//                   <AiOutlineHeart size="20px" color="#fb6e6e" />
//                 )}
//                 <Box ml="-5px">
//                   <Text fz="md" fw="500" color="#fb6e6e">
//                     {post.likes.length}
//                   </Text>
//                 </Box>
//               </Group>
//               <Stack spacing="xs">
//                 <Button
//                   variant="light"
//                   compact
//                   onClick={() => navigate(`/post/${post._id}`)}
//                 >
//                   Comments ({post.comments.length})
//                 </Button>
//                 {post.author._id === currentUserId && (
//                   <Button
//                     variant="light"
//                     compact
//                     color="red"
//                     onClick={() => handleDeletePost(post._id)}
//                   >
//                     Delete
//                   </Button>
//                 )}
//               </Stack>
//             </Stack>
//           </Group>
//         ))}
//       </Stack>
//     </Box>
//   );
// }

// export default Posts;

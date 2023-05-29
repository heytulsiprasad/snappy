// import {
//   Box,
//   Title,
//   Group,
//   Stack,
//   Image,
//   Text,
//   Button,
//   Space,
//   Textarea,
// } from "@mantine/core";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
// import dayjs from "dayjs";
// import axios from "axios";
// import { updatePost } from "../features/tweets/tweetSlice";
// import { useState } from "react";
// import { notifications } from "@mantine/notifications";
// import { IoArrowBackOutline } from "react-icons/io5";

// const Post = () => {
//   const { postId } = useParams();
//   const navigate = useNavigate();
//   const [comment, setComment] = useState("");

//   const dispatch = useDispatch();
//   const post = useSelector((state) =>
//     state.post.posts.find((p) => p._id === postId)
//   );
//   const currentUserId = useSelector((state) => state.auth.currentUser._id);

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

//   const handleAddComment = async (e) => {
//     e.preventDefault();

//     try {
//       if (comment.length > 0) {
//         const res = await axios.post(
//           `/api/posts/comment/${postId}`,
//           JSON.stringify({ content: comment.trim() }),
//           {
//             headers: { "Content-Type": "application/json" },
//           }
//         );

//         console.log(res.data);
//         dispatch(updatePost(res.data.post));
//         setComment("");

//         // Notify user on success
//         notifications.show({
//           color: "teal",
//           title: "Comment added",
//           message: "Your comment has been added successfully",
//         });
//       }
//     } catch (e) {
//       console.error(e);

//       // Notify user on error
//       notifications.show({
//         color: "red",
//         title: "Error",
//         message: "Something went wrong",
//       });
//     }
//   };

//   const handleRemoveComment = async (commentId) => {
//     try {
//       if (commentId) {
//         const res = await axios.delete(
//           `/api/posts/comment/${postId}/${commentId}`
//         );
//         console.log(res.data);
//         dispatch(updatePost(res.data.post));

//         // Notify user on success
//         notifications.show({
//           color: "teal",
//           title: "Comment removed",
//           message: "Your comment has been removed successfully",
//         });
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   return (
//     <Box sx={{ padding: "2rem" }}>
//       <Button
//         variant="outline"
//         mb="2rem"
//         leftIcon={<IoArrowBackOutline />}
//         onClick={() => navigate("/")}
//       >
//         Back to posts
//       </Button>
//       {/* Show the current selected post */}
//       <Group
//         key={post._id}
//         sx={{
//           border: "1px solid #d5d5d5",
//           padding: "1rem 2rem",
//           borderRadius: "5px",
//           justifyContent: "space-between",
//         }}
//       >
//         <Group>
//           {post.image ? (
//             <Box>
//               <Image src={post.image} maw={150} radius="md" withPlaceholder />
//             </Box>
//           ) : (
//             <Box w={150}></Box>
//           )}
//           <Group>
//             <Stack sx={{ justifyContent: "space-between" }}>
//               <Box>
//                 <Text>{post.content}</Text>
//               </Box>
//               <Box>
//                 <Text color="gray" fz="sm">
//                   Created at: {dayjs(post.createdAt).format("DD MMM YYYY")}
//                 </Text>
//                 <Group
//                   sx={{ cursor: "pointer" }}
//                   onClick={() => navigate(`/profile/${post.author._id}`)}
//                 >
//                   <Text color="cyan" fw="600" fs="italic" fz="sm">
//                     Posted by: {post.author.name}
//                   </Text>
//                   <Image
//                     src={post.author.image}
//                     height={20}
//                     width={20}
//                     radius="xl"
//                   />
//                 </Group>
//               </Box>
//             </Stack>
//           </Group>
//         </Group>
//         <Stack>
//           <Group
//             sx={{
//               border: "2px solid #fb6e6e",
//               padding: "10px",
//               borderRadius: "10px",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//             }}
//             onClick={
//               post.likes.includes(currentUserId)
//                 ? () => handleDislike(post._id)
//                 : () => handleLike(post._id)
//             }
//           >
//             {post.likes.includes(currentUserId) ? (
//               <AiFillHeart size="20px" color="#fb6e6e" />
//             ) : (
//               <AiOutlineHeart size="20px" color="#fb6e6e" />
//             )}
//             <Box ml="-5px">
//               <Text fz="md" fw="500" color="#fb6e6e">
//                 {post.likes.length}
//               </Text>
//             </Box>
//           </Group>
//         </Stack>
//       </Group>
//       {/* Add comment widget */}
//       <Space h="2rem" />
//       <Box>
//         <Title order={2} mb="2rem">
//           Post a comment
//         </Title>
//         <form noValidate onSubmit={handleAddComment}>
//           <Textarea
//             placeholder="What's on your mind?"
//             minRows={4}
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             mb="xl"
//             autosize
//           />
//           <Button variant="filled" type="submit" onClick={handleAddComment}>
//             Submit
//           </Button>
//         </form>
//       </Box>
//       {/* Display all the comments */}
//       <Space h="2rem" />
//       <Stack spacing="md">
//         {post.comments.map((cmt) => (
//           <Group
//             key={cmt._id}
//             sx={{
//               justifyContent: "space-between",
//               border: "1px solid #d5d5d5",
//               padding: "1rem 2rem",
//               borderRadius: "5px",
//             }}
//           >
//             <Stack>
//               <Box>
//                 <Text>{cmt.content}</Text>
//               </Box>
//               <Box>
//                 <Text color="gray" fz="sm">
//                   Created at: {dayjs(cmt.createdAt).format("DD MMM YYYY")}
//                 </Text>
//                 <Group>
//                   <Text color="cyan" fw="600" fs="italic" fz="sm">
//                     Posted by: {cmt.author.name}
//                   </Text>
//                   <Image
//                     src={cmt.author.image}
//                     height={20}
//                     width={20}
//                     radius="xl"
//                   />
//                 </Group>
//               </Box>
//             </Stack>
//             <Box>
//               {cmt.author._id === currentUserId && (
//                 <Button
//                   variant="filled"
//                   color="red"
//                   onClick={() => handleRemoveComment(cmt._id)}
//                 >
//                   Delete
//                 </Button>
//               )}
//             </Box>
//           </Group>
//         ))}
//       </Stack>
//     </Box>
//   );
// };

// export default Post;

import styled from "styled-components";
import Post from "./Post";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const AllPosts = () => {
  return (
    <Wrapper>
      <Post />
      <Post />
    </Wrapper>
  );
};

export default AllPosts;

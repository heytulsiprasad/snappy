import styled from "styled-components";
import Compose from "../components/Compose";
import AllPosts from "../components/AllPosts";

const Wrapper = styled.main`
  padding: 1.25rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Home = () => {
  return (
    <Wrapper>
      <Compose />
      <AllPosts />
    </Wrapper>
  );
};

export default Home;

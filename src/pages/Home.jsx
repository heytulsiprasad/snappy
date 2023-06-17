import styled from "styled-components";
import Compose from "../components/Compose";
import Tweets from "../components/Tweets";

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
      <Tweets />
    </Wrapper>
  );
};

export default Home;

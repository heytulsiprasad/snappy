import styled from "styled-components";
import Compose from "../components/Compose";

const Wrapper = styled.main`
  padding: 1.25rem 4rem;
`;

const Home = () => {
  return (
    <Wrapper>
      <Compose />
    </Wrapper>
  );
};

export default Home;

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Home() {
  return (
    <Container>
      <h1>Home</h1>
    </Container>
  );
}

export default Home;

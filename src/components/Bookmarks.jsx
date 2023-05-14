import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Bookmarks() {
  return (
    <Container>
      <h1>Bookmarks</h1>
    </Container>
  );
}

export default Bookmarks;

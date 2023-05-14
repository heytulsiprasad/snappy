import styled from "styled-components";
import { MantineProvider } from "@mantine/core";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container>
        <h1>Snappy</h1>
        <h2>Connect with the world!</h2>
      </Container>
    </MantineProvider>
  );
}

export default App;

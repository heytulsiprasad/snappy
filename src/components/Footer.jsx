import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0 2rem;

  p {
    font-weight: 500;
    font-size: 14px;
    color: #a9a9a9;
  }
`;

const Footer = () => {
  return (
    <Container>
      <p>Created by @thebuildguy</p>
    </Container>
  );
};

export default Footer;

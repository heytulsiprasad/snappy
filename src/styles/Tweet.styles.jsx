import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  padding: 1.25rem;
  background-color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.1rem;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1.25rem;

  .author-image {
    img {
      display: block;
      border-radius: 5px;
      width: 2.5rem;
      height: 2.5rem;
      object-fit: cover;
    }
  }

  .author-info {
    h4 {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.035em;
      color: #000000;
    }

    p {
      font-family: "Noto Sans";
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.035em;
      color: #bdbdbd;
    }
  }
`;

const Content = styled.div`
  margin-bottom: 1.25rem;

  p {
    word-break: break-word;
    overflow-wrap: break-word;
    hyphens: auto;
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.035em;
    color: #4f4f4f;
  }
`;

const Image = styled.div`
  height: 23.4375rem;

  img {
    display: block;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Stats = styled.div`
  margin-top: 0.875rem;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1rem;
    list-style: none;
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 16px;
    letter-spacing: -0.035em;
    color: #bdbdbd;
  }
`;

const Actions = styled.div`
  border-top: 1px solid #f2f2f2;
  border-bottom: 1px solid #f2f2f2;
  padding: 1rem 0;
  margin-top: 0.625rem;

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    list-style: none;

    li {
      cursor: pointer;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 0.75rem;
    }
  }
`;

const Compose = styled.div`
  padding: 0.625rem 0;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

const CommentBox = styled.div`
  width: 100%;

  input {
    width: 100%;
    height: 40px;
    outline: none;
    padding: 0.625rem;
    background: #fafafa;
    border: 1px solid #f2f2f2;
    border-radius: 8px;
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 0.875rem;

    &::placeholder {
      color: #bdbdbd;
    }
  }
`;

const Wrapper2 = styled.div``;

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const Comment = styled.div`
  display: flex;
  gap: 0.625rem;
  align-items: flex-start;
  padding-top: 1.125rem;
`;

const AuthorImage = styled.div`
  img {
    display: block;
    border-radius: 5px;
    width: 2.5rem;
    height: 2.5rem;
    object-fit: cover;
  }
`;

const ContentWithStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const Content2 = styled.div`
  background: #fafafa;
  border-radius: 8px;
  padding: 0.5625rem 0.9375rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  width: 100%;

  .author-info {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    h4 {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 21px;
      letter-spacing: -0.035em;
      color: #000000;
    }

    p {
      font-family: "Noto Sans";
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: -0.035em;
      color: #bdbdbd;
    }
  }

  .comment-content {
    p {
      font-family: "Noto Sans";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: -0.035em;
      color: #4f4f4f;
    }
  }
`;

const Stats2 = styled.div`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.035em;
  color: #bdbdbd;
  display: flex;
  gap: 20px;
  margin-top: 2px;

  .stat-actions {
    cursor: pointer;
    display: flex;
    gap: 5px;
    align-items: center;
  }
`;

export const Tweet = {
  Wrapper,
  AuthorInfo,
  Content,
  Image,
  Stats,
  Actions,
};

export const Comments = {
  Compose,
  CommentBox,
  Wrapper: Wrapper2,
  Section,
  Comment,
  AuthorImage,
  Content: Content2,
  Stats: Stats2,
  ContentWithStats,
};

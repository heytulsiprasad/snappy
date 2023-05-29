import { useSelector } from "react-redux";
import styled from "styled-components";
import { BiImageAlt, BiWorld } from "react-icons/bi";
import { useState } from "react";

const Wrapper = styled.main`
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
`;

const TweetContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.625rem 1.25rem;
`;

const TweetHeading = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 0.75rem;
  color: #4f4f4f;
  padding: 0.625rem 0;
  border-bottom: 1px solid #e0e0e0;
`;

const TweetBody = styled.div`
  padding: 1rem 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  .image-container {
  }

  img {
    display: block;
    border-radius: 0.5rem;
    object-fit: cover;
    width: 50px;
    height: 50px;
  }
`;

const TweetActions = styled.div`
  padding: 0.75rem 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .tweet-config {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
  }

  .tweet-config-reply {
    font-family: "Noto Sans";
    font-style: normal;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 16px;
    color: #2f80ed;
  }
`;

const Button = styled.button`
  padding: 0.65rem 1.8rem;
  background: #2f80ed;
  border-radius: 4px;
  outline: none;
  color: #fff;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
  border: none;

  :hover {
    background: #2c72c7;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 4rem;
  margin: 0 0.75rem;
  border: none;
  outline: none;
  resize: none;

  /* Fonts */
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 22px;
  color: #000;

  ::placeholder {
    color: #bdbdbd;
  }
`;

const Compose = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [tweet, setTweet] = useState("");

  return (
    <Wrapper>
      <TweetContent>
        <TweetHeading>
          <h4>Tweet something</h4>
        </TweetHeading>
        <TweetBody>
          <div className="image-container">
            <img src={currentUser.image} alt="Profile" />
          </div>
          <Textarea
            placeholder="What's happening?"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />
        </TweetBody>
      </TweetContent>
      <TweetActions>
        <div className="tweet-config">
          <BiImageAlt size="20px" color="#2f80ed" />
          <BiWorld size="20px" color="#2f80ed" />
          <div className="tweet-config-reply">
            <h4>Everyone can reply</h4>
          </div>
        </div>
        <div className="tweet-submit">
          <Button>Tweet</Button>
        </div>
      </TweetActions>
    </Wrapper>
  );
};

export default Compose;

import styled from "styled-components";
import axios from "axios";
import Tweet from "./Tweet";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTweets } from "../features/tweets/tweetSlice";
import { Loader } from "@mantine/core";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 2rem;
`;

const AllPosts = () => {
  const [loading, setLoading] = useState(false);
  const { allTweets } = useSelector((state) => state.tweets);
  const dispatch = useDispatch();

  // Fetch all tweets from backend
  useEffect(() => {
    const fetchAllTweets = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/tweets");
        console.log(res.data);
        dispatch(setTweets(res.data));
        setLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    fetchAllTweets();
  }, [dispatch]);

  console.log({ allTweets });

  return (
    <Wrapper>
      {loading ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : (
        allTweets.map((tweet) => <Tweet key={tweet._id} {...tweet} />)
      )}
    </Wrapper>
  );
};

export default AllPosts;

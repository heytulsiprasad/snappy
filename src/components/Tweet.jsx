import { Tweet, Comments } from "./../styles/Tweet.styles";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { BiComment } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";

const TweetComponent = ({
  _id,
  content,
  author,
  image,
  likes,
  comments,
  createdAt,
  updatedAt,
}) => {
  const { currentUser } = useSelector((state) => state.auth);

  const likeHandler = () => {};
  const retweetHandler = () => {};
  const saveHandler = () => {};
  const commentHandler = () => {};

  return (
    <Tweet.Wrapper>
      <Tweet.AuthorInfo>
        <div className="author-image">
          <img src={author.image} alt="Profile" />
        </div>
        <div className="author-info">
          <h4>{author.name}</h4>
          <p>{dayjs(createdAt).format("DD MMM [at] H:m")}</p>
        </div>
      </Tweet.AuthorInfo>
      <Tweet.Content>
        <p>{content}</p>
      </Tweet.Content>
      {image && (
        <Tweet.Image>
          <img src={image} alt="Tweet" />
        </Tweet.Image>
      )}
      <Tweet.Stats>
        <ul>
          <li>
            <span>449</span>
            <span> Comments</span>
          </li>
          <li>
            <span>59k</span>
            <span> Retweets</span>
          </li>
          <li>
            <span>234</span>
            <span> Saved</span>
          </li>
        </ul>
      </Tweet.Stats>
      <Tweet.Actions>
        <ul>
          <li>
            <BiComment size="18px" />
            <span>Comment</span>
          </li>
          <li>
            <FaRetweet size="18px" />
            <span>Retweet</span>
          </li>
          <li>
            <AiOutlineHeart size="18px" />
            <span>Like</span>
          </li>
          <li>
            <BsBookmark size="18px" />
            <span>Saved</span>
          </li>
        </ul>
      </Tweet.Actions>
      <Comments.Wrapper>
        <Comments.Compose>
          <Comments.AuthorImage>
            <img src={currentUser.image} alt="Author profile" />
          </Comments.AuthorImage>
          <Comments.CommentBox>
            <input type="text" placeholder="Tweet your reply" />
          </Comments.CommentBox>
        </Comments.Compose>
        <Comments.Section>
          {comments.map((cmt) => (
            <Comments.Comment key={cmt._id}>
              <Comments.AuthorImage>
                <img
                  src={cmt.author.image}
                  alt={`${cmt.author.name} profile`}
                />
              </Comments.AuthorImage>
              <Comments.ContentWithStats>
                <Comments.Content>
                  <div className="author-info">
                    <h4>{cmt.author.name}</h4>
                    <p>{dayjs(createdAt).format("DD MMM [at] H:m")}</p>
                  </div>
                  <div className="comment-content">
                    <p>{cmt.content}</p>
                  </div>
                </Comments.Content>
                <Comments.Stats>
                  <div className="stat-actions">
                    <AiOutlineHeart size="12px" />
                    <p>Like</p>
                  </div>
                  <p>12k likes</p>
                </Comments.Stats>
              </Comments.ContentWithStats>
            </Comments.Comment>
          ))}
        </Comments.Section>
      </Comments.Wrapper>
    </Tweet.Wrapper>
  );
};

TweetComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  image: PropTypes.string,
  likes: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      author: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired,
    })
  ),
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};

export default TweetComponent;

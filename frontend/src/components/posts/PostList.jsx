import PostItem from "./PostItem";
import "./posts.css";

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
      {posts.map((items) => {
        return <PostItem key={items._id} items={items} />;
      })}
    </div>
  );
};
export default PostList;

import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import { posts, categories } from "../../assets/dummyData";
import "./post.css";
import Pagination from "../../components/pagination/Pagination";
import { useEffect } from "react";

const Post = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar categories={categories} />
      </section>
      <Pagination />
    </div>
  );
};
export default Post;

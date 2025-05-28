import PostList from "../../components/posts/PostList";
import "./home.css";
import { SpinnerCircular } from "spinners-react";
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { infinitePosts } from "../../redux/apiCalls/postApiCall";

const Home = () => {
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loader = useRef(null);

  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);
  const pageRef = useRef(page);

  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  const loadPosts = async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    setLoading(true);

    if (pageRef.current > 1) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    try {
      const result = await dispatch(infinitePosts(pageRef.current));
      const newPosts = result?.payload || [];

      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => {
          const uniqueNewPosts = newPosts.filter(
            (newPost) => !prevPosts.some((p) => p._id === newPost._id)
          );
          return [...prevPosts, ...uniqueNewPosts];
        });
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loadingRef.current &&
          hasMoreRef.current
        ) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 1,
      }
    );

    const currentLoader = loader.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, []);

  return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <h1 className="home-title">Welcome To Blog</h1>
        </div>
      </div>

      <div className="home-latest-post">Latest Posts</div>

      <div className="home-container">
        <PostList posts={posts} />
        <Sidebar />
      </div>

      <div ref={loader} style={{ height: "1px" }} />

      {loading && (
        <p style={{ textAlign: "center", marginBottom: "15px" }}>
          <SpinnerCircular size={80} color="blue" />
        </p>
      )}
      {!hasMore && (
        <div className="home-see-posts-link">
          <p className="home-link" to="/posts">
            No more posts to load
          </p>
        </div>
      )}
    </section>
  );
};

export default Home;

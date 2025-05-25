import { Link, useNavigate, useParams } from "react-router-dom";
import "./post-details.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import Swal from "sweetalert2";
import UpdatePostModal from "./UpdatePostModal";
import {
  deletePost,
  fetchSinglePost,
  toggleLikePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCall";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSinglePost(id));
    window.scrollTo(0, 0);
  }, [id]);

  // Toggle Like Post Handler
  const toggleLikeHandler = () => {
    dispatch(toggleLikePost(post?._id));
  };

  // Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) toast.warning("File is missing!");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
  };

  const imageHandler = (e) => {
    setFile(e.target.files[0]);
  };

  // Delete Post Handler
  const deletePostHandler = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  // Toggle Update
  const updatePostHandler = () => {
    setUpdatePost(true);
  };

  return (
    <section className="post-details">
      <div className="post-details-image-wrapper">
        <img
          src={file ? URL.createObjectURL(file) : post?.image.url}
          alt=""
          className="post-details-image"
        />
        {user?._id === post?.user._id && (
          <form
            onSubmit={updateImageSubmitHandler}
            className="update-post-image-form"
          >
            <label htmlFor="file" className="update-class-label">
              <i className="bi bi-image-fill"></i>
              Select new image
            </label>
            <input
              onChange={imageHandler}
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
            />
            <button type="submit">Upload</button>
          </form>
        )}
      </div>
      <h1 className="post-details-title">{post?.title}</h1>
      <div className="post-details-user-info">
        <img
          src={post?.user.profilePhoto?.url}
          alt=""
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <div
        className="post-item-description"
        dangerouslySetInnerHTML={{ __html: post?.description }}
      ></div>
      <div className="post-details-icon-wrapper">
        <div>
          {user && (
            <i
              onClick={toggleLikeHandler}
              className={
                post?.likes.includes(user?._id)
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up"
              }
            ></i>
          )}
          <small>{post?.likes.length} Likes</small>
        </div>
        {user?._id === post?.user._id && (
          <div>
            <i onClick={updatePostHandler} className="bi bi-pencil-square"></i>
            <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
          </div>
        )}
      </div>

      <AddComment />
      <CommentList user={user} comments={post?.comments} />

      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </section>
  );
};
export default PostDetails;

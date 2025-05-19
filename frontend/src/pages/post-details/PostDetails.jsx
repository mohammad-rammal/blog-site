import { Link, useParams } from "react-router-dom";
import { posts } from "../../assets/dummyData";
import "./post-details.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import Swal from "sweetalert2";
import UpdatePostModal from "./UpdatePostModal";

const PostDetails = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);
  const post = posts.find((p) => p._id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) toast.warning("File is missing!");
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
        Swal.fire({
          title: "Deleted!",
          text: "Your post has been deleted.",
          icon: "success",
        });
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
          src={file ? URL.createObjectURL(file) : post.image}
          alt=""
          className="post-details-image"
        />
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
      </div>
      <h1 className="post-details-title">{post.title}</h1>
      <div className="post-details-user-info">
        <img src={post.user.image} alt="" className="post-details-user-image" />
        <div className="post-details-user">
          <strong>
            <Link to="/profile/1">{post.user.username}</Link>
          </strong>
          <span>{post.createdAt}</span>
        </div>
      </div>
      <p className="post-details-description">
        {post.description}
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel laborum
        esse corrupti hic, ad repellendus odio doloribus minima, eaque rem
        aperiam molestiae laudantium non odit explicabo ratione quam possimus
        unde? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel
        laborum esse corrupti hic, ad repellendus odio doloribus minima, eaque
        rem aperiam molestiae laudantium non odit explicabo ratione quam
        possimus unde?
      </p>
      <div className="post-details-icon-wrapper">
        <div>
          <i className="bi bi-hand-thumbs-up"></i>
          <small>{post.likes.length} Likes</small>
        </div>
        <div>
          <i onClick={updatePostHandler} className="bi bi-pencil-square"></i>
          <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
        </div>
      </div>

      <AddComment />
      <CommentList />

      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </section>
  );
};
export default PostDetails;

import { Link, useParams } from "react-router-dom";
import { posts } from "../../assets/dummyData";
import "./post-details.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PostDetails = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
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
          <i className="bi bi-pencil-square"></i>
          <i className="bi bi-trash-fill"></i>
        </div>
      </div>
      <div className=""></div>
      <div className=""></div>
    </section>
  );
};
export default PostDetails;

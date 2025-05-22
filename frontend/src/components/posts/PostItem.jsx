import { Link } from "react-router-dom";

const PostItem = ({ items }) => {
  return (
    <div className="post-item">
      <div className="post-item-image-wrapper">
        <img src={items?.image.url} alt="" className="post-item-image" />
      </div>
      <div className="post-item-info-wrapper">
        <div className="post-item-info">
          <div className="post-item-author">
            <strong>Author: </strong>
            <Link
              className="post-item-username"
              to={`/profile/${items?.user?._id}`}
            >
              {items?.user.username}
            </Link>
          </div>
          <div className="post-item-date">
            {new Date(items?.createdAt).toDateString()}
          </div>
        </div>
        <div className="post-item-details">
          <h4 className="post-item-title">{items?.title}</h4>
          <Link
            className="post-item-category"
            to={`/posts/categories/${items?.category}`}
          >
            {items?.category}
          </Link>
        </div>
        <div
          className="post-item-description"
          dangerouslySetInnerHTML={{ __html: items?.description }}
        ></div>
        <Link className="post-item-link" to={`/posts/details/${items?._id}`}>
          Read More...
        </Link>
      </div>
    </div>
  );
};
export default PostItem;

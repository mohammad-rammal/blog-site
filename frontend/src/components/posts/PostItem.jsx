import { Link } from "react-router-dom";

const PostItem = ({ items }) => {
  return (
    <div className="post-item">
      <div className="post-item-image-wrapper">
        <img src={items.image} alt="" className="post-item-image" />
      </div>
      <div className="post-item-info-wrapper">
        <div className="post-item-info">
          <div className="post-item-author">
            <strong>Author: </strong>
            <Link className="post-item-username" to="/profile/1">
              {items.user.username}
            </Link>
          </div>
          <div className="post-item-date">
            {new Date(items.createdAt).toDateString()}
          </div>
        </div>
        <div className="post-item-details">
          <h4 className="post-item-title">{items.title}</h4>
          <Link
            className="post-item-category"
            to={`/posts/categories/${items.category}`}
          >
            {items.category}
          </Link>
        </div>
        <p className="post-item-description">
          {items.description}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia nihil
          ab maxime fuga, quaerat voluptas aliquam dolores eveniet quas
          temporibus quibusdam error eaque aliquid nemo nisi, laborum itaque
          asperiores excepturi. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Officia nihil ab maxime fuga, quaerat voluptas
          aliquam dolores eveniet quas temporibus quibusdam error eaque aliquid
          nemo nisi, laborum itaque asperiores excepturi.
        </p>
        <Link className="post-item-link" to={`/posts/details/${items._id}`}>
          Read More...
        </Link>
      </div>
    </div>
  );
};
export default PostItem;

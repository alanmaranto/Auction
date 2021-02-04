import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const PostsWrapper = ({ name, message, createdAt, right }) => {
  return (
    <div className="post-wrapper">
      <div
        className="post-wrapper__header"
        style={{
          flexFlow: right ? "row-reverse" : "row",
          color: right ? "black" : "gray",
        }}
      >
        {name && <p className="post-wrapper__header--name">{name}</p>}
      </div>
      <div className="post-wrapper__content">
        <div
          className="post-wrapper__content--message"
          style={{
            backgroundColor: right ? "#FFF" : "#1366c4",
            color: right ? "#1366c4" : "#FFF",
            float: right ? "right" : "left",
            textAlign: right ? "right" : "left",
            border: right ? "1px solid #1366c4" : "none",
          }}
        >
          {message && (
            <p className="post-wrapper__content--message__text">{message}</p>
          )}
          {createdAt && (
            <p className="post-wrapper__content--message__createdAt">
              {createdAt}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

PostsWrapper.defaultProps = {
  right: false,
};

PostsWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  right: PropTypes.bool,
};

export default PostsWrapper;

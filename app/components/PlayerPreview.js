import React from "react";
import PropTypes from "prop-types";

const PlayerPreview = ({ username, avatar, children }) => {
  return (
    <div className="column">
      <img src={avatar} alt={`Avatar for ${username}`} className="avatar" />
      <h2 className="username">@{username}</h2>
      {children}
    </div>
  );
};

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
};

export default PlayerPreview;

import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const ScrollableComponent = ({ children, maxHeight, type }) => (
  <div className={`scroll ${type}`} style={{ maxHeight }}>
    {children}
  </div>
);

ScrollableComponent.defaultProps = {
  children: undefined,
  type: "vertical",
  maxHeight: undefined,
};

ScrollableComponent.propTypes = {
  maxHeight: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
};

export default ScrollableComponent;

import React from 'react';
import PropTypes from 'prop-types';

function Breadcrumb(props) {
  const { paths } = props;
  return (
    <>
      <a href="#/" className="tip-bottom">主页</a>
      {paths.map((item) => (<a href={`#${item.href}`} className={item.className} key={item.href}>{item.name}</a>))}
    </>
  );
}

Breadcrumb.propTypes = {
  paths: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Breadcrumb;

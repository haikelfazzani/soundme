import React from 'react';

export default function ScrollTop () {

  const onScrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (<span className="btn stand-btn fs-12 text-uppercase" onClick={onScrollToTop}>
    <i className="fa fa-arrow-up"></i></span>);
}
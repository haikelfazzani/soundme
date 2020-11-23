import React from 'react';
import Img from './Img';
import svgMetric from '../img/metric.svg';

export default function EmptyList () {
  return (<div className="empty-list h-100 w-100 d-flex flex-column justify-content-center align-items-center text-center">
    <Img src={svgMetric} clx="w-100 h-100 mb-3" alt="find a song that you enjoy" />
    <p className="text-muted pr-2 pl-2">When you find a song that you enjoy, add it to your Favorites so that you can easily access it again.</p>
    <i className="fa fa-heart"></i>
  </div>);
}
import React from 'react';
import placeImg from '../img/1.png';

export default function Img ({ src, alt, clx }) {
  return <img
    src={src || placeImg}
    alt={alt}
    className={clx}
  />;
}
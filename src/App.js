import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

export default function App () {

  useEffect(()=>{
  
  axios.get('https://api.soundcloud.com/tracks?genres=rock&client_id='+process.env.API_KEY)
  .then(result => {
    console.log(result.data);
    
  })
  .catch(e=>{
    console.log(e);
    
  })
  },[]);

  return (
    <div className="App">

    </div>
  );
}

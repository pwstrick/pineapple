import React from 'react';
import './app.scss';
import avatar from '../../img/avatar.png';

function App() {
  // console.log("success");
  return (
    <div>
      <img src={avatar} width="100" alt="avatar" />
      <div className="container">Hello World！</div>
    </div>
  );
}
export default App;

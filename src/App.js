import React from 'react';
import Starships from './components/Starships/Starships';
import Logo from './assets/images/millennium-falcon.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header-content">
        <img src={Logo} height="50px" alt="millennium falcon icon" />
        <h1>Starship Catalogue</h1>
      </div>
      <Starships />
      <div className="footer">
        <h3>The Force will be with you. Always.</h3>
      </div>
    </div>
  );
}

export default App;

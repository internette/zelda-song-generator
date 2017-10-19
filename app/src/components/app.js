import React from 'react'

import Header from "./containers/header"
import MusicSheet from "./containers/music-sheet"

import '../styles/app.css'

const App = ()=> {
  return (
    <div id="container">
      <Header />
      <div id="music-instruments">
        
      </div>
      <div id="generated-music-items">
        <MusicSheet />
      </div>
    </div>
  );
}

export default App;

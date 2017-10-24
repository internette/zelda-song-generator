import React from 'react'

import Header from "./containers/header"
import MusicSheet from "./containers/music-sheet"
import Instruments from "./containers/instruments"

import '../styles/app.css'

const App = ()=> {
  return (
    <div id="container">
      <div id="music-instruments">
        <Instruments/>
      </div>
      <div id="generated-music-items">
        <div className="container-content">
          <Header />
          <MusicSheet />
        </div>
      </div>
    </div>
  );
}

export default App;
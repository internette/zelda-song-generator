import React from 'react'
import PropTypes from 'prop-types'

const HeaderPresenter = (props) => {
  return (
    <header>
      <h1><span onClick={props.generateTitle}>{props.song_name}</span><button className="info" onClick={props.showInstructions}>?</button></h1>
      <div id="buttons">
        <button className="black button" onClick={()=> {
          props.randomizeSong(props.instrument)
        }}>Generate Song</button>
        <button className="black button" onClick={props.clearSong}>Clear Song</button>
      </div>
    </header>
  )
}

HeaderPresenter.propTypes = {
  showInstructions: PropTypes.func.isRequired,
  generateTitle: PropTypes.func.isRequired,
  randomizeSong: PropTypes.func.isRequired,
  clearSong: PropTypes.func.isRequired,
  song_name: PropTypes.string.isRequired
}

export default HeaderPresenter
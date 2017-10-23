import React from 'react'
import PropTypes from 'prop-types'

const HeaderPresenter = (props) => {
  return (
    <header>
      <h1 onClick={props.generateTitle}>{props.song_title}</h1>
      <button onClick={props.randomizeSong}>Create Random Song</button>
      <button onClick={props.clearSong}>Clear Sheet Music</button>
    </header>
  )
}

HeaderPresenter.propTypes = {
  generateTitle: PropTypes.func.isRequired,
  generateSong: PropTypes.func.isRequired,
  getFileName: PropTypes.func.isRequired,
  randomizeSong: PropTypes.func.isRequired,
  clearSong: PropTypes.func.isRequired,
  song_title: PropTypes.string.isRequired
}

export default HeaderPresenter
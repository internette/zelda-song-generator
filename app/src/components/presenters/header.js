import React from 'react'
import PropTypes from 'prop-types'

const HeaderPresenter = (props) => {
  return (
    <header>
      <h1>{props.song_title}</h1>
      <button onClick={props.randomizeSong}>Create Random Song</button>
    </header>
  )
}

HeaderPresenter.propTypes = {
  generateTitle: PropTypes.func.isRequired,
  generateSong: PropTypes.func.isRequired,
  randomizeSong: PropTypes.func.isRequired,
  clearSong: PropTypes.func.isRequired,
  song_title: PropTypes.string.isRequired
}

export default HeaderPresenter
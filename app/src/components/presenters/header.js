import React from 'react'
import PropTypes from 'prop-types'

const HeaderPresenter = (props) => {
  return (
    <h1>{props.song_title}</h1>
  )
}

HeaderPresenter.propTypes = {
  createRandomSongTitle: PropTypes.func.isRequired,
  createRandomSong: PropTypes.func.isRequired,
  clearSong: PropTypes.func.isRequired,
  song_title: PropTypes.string.isRequired
}

export default HeaderPresenter
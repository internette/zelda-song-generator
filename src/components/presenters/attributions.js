import React from 'react'
import PropTypes from 'prop-types'

import '../../styles/modal.css'

const AttributionsPresenter = (props) => {
  const classes = props.is_attributions_visible ? 'active modal-container' : 'modal-container'
  return (
    <div id="attributions-holder" className={classes}>
      <div className="backscreen"></div>
      <div id="attributions">
        <button onClick={props.hideAttributions} className="exit" aria-label="exit the attributions modal">&times;</button>
        <h3>Attributions</h3>
        <ul>
          <li>Any and all Zelda-related content belongs to Nintendo</li>
          <li>Zelda songs were found at the following link: <a href="http://noproblo.dayjo.org/ZeldaSounds/" target="_blank" rel="noopener noreferrer">Zelda Sounds</a></li>
          <li><a href="https://www.linkshideaway.com/majoras-mask-3d/song-list/" target="_blank" rel="noopener noreferrer">Link's Hideaway</a> provides a list of all Majora's Mask songs to verify pre-existing songs.</li>
          <li>The color palette used is <a href="https://dribbble.com/shots/409863--107" target="_blank" rel="noopener noreferrer">_107</a> by <a href="https://dribbble.com/JustinMezzell" target="_blank" rel="noopener noreferrer">Justin Mezzell</a></li>
        </ul>
        <div className="triforce"></div>
      </div>
    </div>
  )
}

AttributionsPresenter.propTypes = {
  hideAttributions: PropTypes.func.isRequired,
  is_attributions_visible: PropTypes.bool.isRequired
}

export default AttributionsPresenter
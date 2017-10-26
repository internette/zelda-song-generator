import React from 'react'
import PropTypes from 'prop-types'

import '../../styles/instructions.css'

const InstructionsPresenter = (props) => {
  const classes = props.is_visible ? 'active' : ''
  return (
    <div id="instructions-holder" className={classes}>
      <div id="backscreen"></div>
      <div id="instructions">
        <button onClick={props.hideInstructions}>&times;</button>
        <h3>Interaction Options</h3>
        <ul>
          <li>Click notes to remove them</li>
          <li>Use the backspace key on your keyboard to remove the last note</li>
          <li>Use any of the keys to add to the song: &#8592;, &#8593;, &#8594;, &#8595;, or A</li>
          <li>Click the generate button to generate a new song and title</li>
          <li>Click the title to generate a new title</li>
        </ul>
      </div>
    </div>
  )
}

InstructionsPresenter.propTypes = {
  hideInstructions: PropTypes.func.isRequired,
  is_visible: PropTypes.bool.isRequired
}

export default InstructionsPresenter
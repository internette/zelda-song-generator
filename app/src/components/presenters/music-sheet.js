import React from 'react'
import PropTypes from 'prop-types'
import { letters } from '../exports/markov-music'

import '../../styles/music-sheet.css'

const MusicSheetPresenter = (props) => (
  <div>
    {props.notes.map((note, index) => {
        let classes = 'button'
        classes += ' ' + letters.filter(function(letter_obj){
          if(letter_obj.letter === note){
            return letter_obj
          }
          return false;
        })[0].button.toLowerCase();
        if(["X", "A", "R", "Y"].indexOf(note) > -1){
          classes += ' cpad'
        }
        return <div className={classes} key={index} onClick={props.removeNote}></div>
      })}
  </div>
)

MusicSheetPresenter.propTypes = {
  addNote: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
  generateSong: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
  filename: PropTypes.string.isRequired
}

export default MusicSheetPresenter
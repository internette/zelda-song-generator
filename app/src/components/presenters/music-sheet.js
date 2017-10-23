import React from 'react'
import PropTypes from 'prop-types'
import { letters } from '../exports/markov-music'

import '../../styles/music-sheet.css'

const MusicSheetPresenter = (props) => {
  let button
  if (props.filename.length > 0){
    button = <a href={props.filename} download>Download Song</a>
  } else {
    button = <button onClick={()=>{
      props.buildSong(props.notes)
    }}>Build My Song</button>
  }
  return (
    <div>
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
            return <button className={classes} key={index} onClick={()=> { props.removeNote(props.notes, index) }}></button>
          })}
      </div>
      {button}
    </div>
  )
}

MusicSheetPresenter.propTypes = {
  buildSong: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
  filename: PropTypes.string.isRequired
}

export default MusicSheetPresenter
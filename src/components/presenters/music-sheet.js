import React from 'react'
import PropTypes from 'prop-types'
import { letters } from '../exports/markov-music'

import '../../styles/music-sheet.css'

const MusicSheetPresenter = (props) => {
  return (
    <div>
      <div id="music-sheet">
        {props.notes.map((note, index) => {
            let classes = 'note'
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
      <button className="button black" onClick={(e)=>{
        props.showEmail()
        props.changeStatus(e.currentTarget)
      }}>Build My Song</button>
      <button id="attributions" className="wood" onClick={props.showAttributions}>Attributions</button>
    </div>
  )
}

MusicSheetPresenter.propTypes = {
  showAttributions: PropTypes.func.isRequired,
  showEmail: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
  filename: PropTypes.string.isRequired
}

export default MusicSheetPresenter
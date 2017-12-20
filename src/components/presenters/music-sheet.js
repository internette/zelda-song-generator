import React from 'react'
import PropTypes from 'prop-types'
import { letters, base_url } from '../exports/markov-music'
import '../../styles/music-sheet.css'

const MusicSheetPresenter = (props) => {
  const audio_url = base_url.replace('/api', '/public/sound_clips/')
  return (
    <div>
      <div id="music-sheet">
        {props.notes.map((note_obj, index) => {
            let classes = 'note'
            classes += ' ' + letters.filter(function(letter_obj){
              if(letter_obj.letter === note_obj.note){
                return letter_obj
              }
              return false
            })[0].button.toLowerCase()
            if(["X", "A", "R", "Y"].indexOf(note_obj.note) > -1){
              classes += ' cpad'
            }
            let time_val_class = 'time-value'
            switch(note_obj.time_value){
              case 0.1:
                time_val_class += ' quarter'
                break
              case 0.25:
                time_val_class += ' half'
                break
              case 0.5:
                time_val_class += ' whole'
                break
              default:
                break
            }
            return <div className="note-container" key={index}><div className="remove" onClick={()=> {props.removeNote(props.notes, index)}}>&times;</div><div aria-label={"click to remove the " + (index + 1) + " note"} className={classes}></div><div className={time_val_class} onClick={()=> { props.changeTimeValue(props.notes, note_obj, index) }}><div></div></div></div>
          })}
      </div>
      <div>
        {props.notes.map((note_obj, index) => {
          const note_val = letters.filter(function(letter_obj){
            if(letter_obj.letter === note_obj.note){
              return letter_obj
            }
            return false
          })[0].note
          return <audio key={index} id={"song-note-" + index} className="audio-note" src={ audio_url + props.instrument + '_' + note_val + '.mp3' }></audio>
        })}
        <button className="button black" onClick={()=> { props.playSong(props.notes, props.instrument) }}>Play</button>
        <button className="button black" onClick={(e)=>{
          props.showEmail()
          props.changeStatus(e.currentTarget)
        }}>E-mail Song</button>
        <button id="attributions" className="wood" onClick={props.showAttributions}>Attributions</button>
      </div>
    </div>
  )
}

MusicSheetPresenter.propTypes = {
  showAttributions: PropTypes.func.isRequired,
  showEmail: PropTypes.func.isRequired,
  removeNote: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  changeTimeValue: PropTypes.func.isRequired,
  playSong: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
  filename: PropTypes.string.isRequired
}

export default MusicSheetPresenter
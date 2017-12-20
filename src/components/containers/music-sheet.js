import { connect } from 'react-redux'
import MusicSheetPresenter from '../presenters/music-sheet'
import { time_values } from '../exports/markov-music'
import { setNotes, toggleModal } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    song_name: state.header.title,
    notes: state.musicSheet.notes,
    filename: state.musicSheet.filename || '',
    instrument: state.instrument.name
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeNote: (notes, index)=> {
      const filtered_notes = notes.filter(function(note, curr_index){
        if(curr_index !== index){
          return note
        }
        return false
      })
      return dispatch(setNotes(filtered_notes))
    },
    playSong: (notes, instrument)=> {
      const audio_elms = document.getElementsByClassName('audio-note')
      audio_elms[0].play()
      Array.prototype.forEach.call(audio_elms, (elm, index)=> {
        elm.addEventListener('play', (ev)=> {
          const time_val = (notes[index].time_value * 1000) * 2
          setTimeout(()=>{
            audio_elms[index].pause()
            if(index !== (audio_elms.length - 1)){
              audio_elms[index + 1].play()
            }
          }, time_val)
        })
      })
      
    },
    changeStatus: (elm)=> {
      elm.className += ' pending'
    },
    changeTimeValue: (notes, note_obj, index)=> {
      const curr_time_value_index = time_values.indexOf(note_obj.time_value)
      const next_time_index = curr_time_value_index === (time_values.length - 1) ? 0 : curr_time_value_index + 1
      let updated_notes = notes
      updated_notes[index].time_value = time_values[next_time_index]
      return dispatch(setNotes(updated_notes))
    },
    showAttributions: ()=> {
      return dispatch(toggleModal(true, 'attributions'))
    },
    showEmail: ()=> {
      return dispatch(toggleModal(true, 'email'))
    }
  }
}

const MusicSheet = connect(mapStateToProps,mapDispatchToProps)(MusicSheetPresenter)

export default MusicSheet
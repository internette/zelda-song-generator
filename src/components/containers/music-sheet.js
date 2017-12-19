import { connect } from 'react-redux'
import MusicSheetPresenter from '../presenters/music-sheet'
import { time_values } from '../exports/markov-music'
import { setNotes, toggleModal } from '../actions'

const mapStateToProps = (state, ownProps) => {
  console.log(state.musicSheet.notes)
  return {
    song_name: state.header.title,
    notes: state.musicSheet.notes,
    filename: state.musicSheet.filename ? state.musicSheet.filename : '',
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
      dispatch(setNotes(filtered_notes))
    },
    changeStatus: (elm)=> {
      elm.className += ' pending'
    },
    changeTimeValue: (notes, note_obj, index)=> {
      const curr_time_value_index = time_values.indexOf(note_obj.time_value)
      const next_time_index = curr_time_value_index === (time_values.length - 1) ? 0 : curr_time_value_index + 1
      let updated_notes = notes
      updated_notes[index].time_value = time_values[next_time_index]
      dispatch(setNotes(updated_notes))
    },
    showAttributions: ()=> {
      dispatch(toggleModal(true, 'attributions'))
    },
    showEmail: ()=> {
      dispatch(toggleModal(true, 'email'))
    }
  }
}

const MusicSheet = connect(mapStateToProps,mapDispatchToProps)(MusicSheetPresenter)

export default MusicSheet
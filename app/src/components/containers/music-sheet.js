import { connect } from 'react-redux'
import MusicSheetPresenter from '../presenters/music-sheet'
import { letters, base_url } from '../exports/markov-music'
import { setNotes, setAudioFileUrl } from '../actions'

const mapStateToProps = (state, ownProps) => {
  console.log(state.instrument)
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
    buildSong: (song, song_name, instrument)=> {
      const formatted_song = song.map(function(note_obj){
        return letters.filter(function(letter_obj){
          if(letter_obj.letter === note_obj){
            return letter_obj
          }
          return false
        })[0].note
      }).join('%20');
      var xhr = new XMLHttpRequest();
      xhr.open('GET', base_url + '/make-song?notes=' + formatted_song + '&instrument='+ instrument +'&song_title=' + song_name, true);
      
      xhr.onload = function () {
        if(xhr.readyState === 4){
          dispatch(setAudioFileUrl(xhr.responseText))
        }
      };
      
      xhr.send(null);
    }
  }
}

const MusicSheet = connect(mapStateToProps,mapDispatchToProps)(MusicSheetPresenter)

export default MusicSheet
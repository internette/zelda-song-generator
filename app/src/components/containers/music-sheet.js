import { connect } from 'react-redux'
import MusicSheetPresenter from '../presenters/music-sheet'
import { letters, markovMusic } from '../exports/markov-music'
import { setNotes } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    notes: state.musicSheet.notes ? state.musicSheet.notes : markovMusic(),
    filename: state.musicSheet.filename ? state.musicSheet.filename : ''
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addNote: ()=> {

    },
    removeNote: ()=> {
      
    },
    generateSong: ()=> {
      const song = markovMusic()
      const formatted_song = song.split('').map(function(note_obj){
        return letters.filter(function(letter_obj){
          if(letter_obj.letter === note_obj){
            return letter_obj
          }
          return false
        }).note
      });
      console.log(formatted_song)
      dispatch(setNotes(song))
    },
    clearSong: ()=> {
      
    },
  }
}

const MusicSheet = connect(mapStateToProps,mapDispatchToProps)(MusicSheetPresenter)

export default MusicSheet
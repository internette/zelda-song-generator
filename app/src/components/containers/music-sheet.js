import { connect } from 'react-redux'
import MusicSheetPresenter from '../presenters/music-sheet'
import { markovMusic } from '../exports/markov-music'
import { setNotes } from '../actions'

const audioconcat = require('audioconcat')

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
    formatNote: (note)=> {

    },
    createRandomSong: ()=> {
      dispatch(setNotes(markovMusic()))
    },
    clearSong: ()=> {
      
    },
  }
}

const MusicSheet = connect(mapStateToProps,mapDispatchToProps)(MusicSheetPresenter)

export default MusicSheet
import { connect } from 'react-redux'
import HeaderPresenter from '../presenters/header'
import { letters, markovMusic, generateTitle, base_url } from '../exports/markov-music'
import { setTitle, setNotes, toggleModal } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    song_name: state.header.title,
    instrument: state.instrument.name
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    generateTitle: ()=>{
      dispatch(setTitle(generateTitle()))
    },
    showInstructions: ()=>{
      dispatch(toggleModal(true, 'instructions'))
    },
    randomizeSong: (instrument)=> {
      const song_name = generateTitle()
      const song = markovMusic(song_name)
      dispatch(setNotes(song))
      dispatch(setTitle(song_name))
      const formatted_song = song.map(function(note_obj){
        return letters.filter(function(letter_obj){
          if(letter_obj.letter === note_obj){
            return letter_obj
          }
          return false
        })[0].note
      }).join('%20');
      fetch(`${base_url}/make-song`, {
        method: 'post',
        body: JSON.stringify({
          notes: formatted_song,
          instrument: instrument,
          song_name: song_name
        })
      })
    },
    clearSong: ()=> {
      dispatch(setTitle(generateTitle()))
      dispatch(setNotes([]))
    }
  }
}

const Header = connect(mapStateToProps,mapDispatchToProps)(HeaderPresenter)

export default Header
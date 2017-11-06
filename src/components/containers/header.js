import { connect } from 'react-redux'
import HeaderPresenter from '../presenters/header'
import { letters, markovMusic, generateTitle, base_url } from '../exports/markov-music'
import { setTitle, setNotes, setAudioFileUrl, toggleInstructions } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    song_title: state.header.title,
    instrument: state.instrument.name
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    generateTitle: ()=>{
      dispatch(setTitle(generateTitle()))
    },
    showInstructions: ()=>{
      dispatch(toggleInstructions(true))
    },
    randomizeSong: (instrument)=> {
      dispatch(setAudioFileUrl(''))
      const song_title = generateTitle()
      const song = markovMusic(song_title)
      dispatch(setNotes(song))
      dispatch(setTitle(song_title))
      const formatted_song = song.map(function(note_obj){
        return letters.filter(function(letter_obj){
          if(letter_obj.letter === note_obj){
            return letter_obj
          }
          return false
        })[0].note
      }).join('%20');
      fetch(`${base_url}/make-song?notes=${formatted_song}&instrument=${instrument}&song_title=${song_title}`).then((response)=> {
        return response.text()
      }).then((url)=>{
        dispatch(setAudioFileUrl(url))
      })
    },
    clearSong: ()=> {
      dispatch(setTitle(generateTitle()))
      dispatch(setNotes([]))
      dispatch(setAudioFileUrl(''))
    }
  }
}

const Header = connect(mapStateToProps,mapDispatchToProps)(HeaderPresenter)

export default Header
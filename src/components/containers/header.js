import { connect } from 'react-redux'
import HeaderPresenter from '../presenters/header'
import { markovMusic, generateTitle } from '../exports/markov-music'
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
    },
    clearSong: ()=> {
      dispatch(setTitle(generateTitle()))
      dispatch(setNotes([]))
    }
  }
}

const Header = connect(mapStateToProps,mapDispatchToProps)(HeaderPresenter)

export default Header
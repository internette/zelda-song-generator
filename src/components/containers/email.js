import { connect } from 'react-redux'
import EmailPresenter from '../presenters/instructions'
import { letters, markovMusic, generateTitle, base_url } from '../exports/markov-music'
import { toggleModal } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    is_visible: state.modals.modal_name === 'email' ? state.modals.visibility : false,
    email: state.email.address,
    song_name: state.header.title,
    instrument: state.instrument.name,
    notes: state.musicSheet.notes,

  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hideEmail: ()=> {
      dispatch(toggleModal(false, 'email'))
    },
    sendSong: (song, song_name, instrument, email_address)=> {
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
          song_name: song_name,
          email: email_address
        })
      }).then((response)=> {
        return response.text()
      }).then((url)=>{
        dispatch(setAudioFileUrl(url))
      })
    }
  }
}

const Email = connect(mapStateToProps,mapDispatchToProps)(EmailPresenter)

export default Email
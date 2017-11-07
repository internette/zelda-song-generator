import { connect } from 'react-redux'
import EmailPresenter from '../presenters/email'
import { letters, base_url } from '../exports/markov-music'
import { toggleModal, setEmail, setVisibleText } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    is_email_visible: state.modals.modal_name === 'email' ? state.modals.visibility : false,
    email_address: state.email.address,
    song_name: state.header.title,
    instrument: state.instrument.name,
    notes: state.musicSheet.notes,
    visible_text: state.email.visible_text
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hideEmail: ()=> {
      dispatch(toggleModal(false, 'email'))
    },
    updateEmail: (email_address)=> {
      dispatch(setEmail(email_address))
      dispatch(toggleModal(true, 'email'))
    },
    backToInstructions: ()=> {
      dispatch(setVisibleText('email-instructions'))
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
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          notes: formatted_song,
          instrument: instrument,
          song_name: song_name,
          email_address: email_address
        })
      }).then(()=> {
        dispatch(setVisibleText('email-sent'))
      })
    }
  }
}

const Email = connect(mapStateToProps,mapDispatchToProps)(EmailPresenter)

export default Email
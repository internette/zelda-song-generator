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
      dispatch(setVisibleText('email-instruction'))
      document.getElementById('error').classList.remove('active')
      document.getElementById('music-sheet').nextElementSibling.classList.remove('pending')
    },
    updateEmail: (email_address)=> {
      dispatch(setEmail(email_address))
      dispatch(toggleModal(true, 'email'))
      document.getElementById('error').classList.remove('active')
    },
    backToInstructions: ()=> {
      document.getElementById('error').classList.remove('active')
      document.querySelector('.black.button').classList.remove('pending')
      dispatch(setVisibleText('email-instructions'))
      dispatch(toggleModal(true, 'email'))
    },
    sendSong: (song, song_name, instrument, email_address)=> {
      if(email_address.length <= 0){
        document.getElementById('error').classList.add('active')
        document.getElementById('hey-listen').play()
      } else {
        document.getElementById('error').classList.remove('active')
        const formatted_song_notes = song.map(function(note_obj){
          return letters.filter(function(letter_obj){
            if(letter_obj.letter === note_obj.note){
              return letter_obj
            }
            return false
          })[0].note
        }).join('%20')
        const formatted_song_times = song.map(function(note_obj){
          return note_obj.time_value
        }).join('%20')
        document.getElementById('submit-send-email').classList.add('pending')
        fetch(`${base_url}/make-song`, {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            notes: formatted_song_notes,
            time_values: formatted_song_times,
            instrument: instrument,
            song_name: song_name,
            email_address: email_address
          })
        }).then(()=> {
          dispatch(setVisibleText('email-sent'))
          dispatch(toggleModal(true, 'email'))
        })
      }
    }
  }
}

const Email = connect(mapStateToProps,mapDispatchToProps)(EmailPresenter)

export default Email
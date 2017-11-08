import React from 'react'
import PropTypes from 'prop-types'

import '../../styles/modal.css'

const EmailPresenter = (props) => {
  const classes = props.is_email_visible ? 'active modal-container' : 'modal-container'
  let email_modal_text
  if(props.visible_text === 'email-instructions'){
    email_modal_text = <div><h3>E-mail This Song</h3><div><p>Enter the e-mail where you would like the download URL for the song sent below.</p><p><label htmlFor="email_address">E-mail Address</label><input id="email_address" onChange={(e)=> { return props.updateEmail(e.target.value)}} /></p><button className="black button" onClick={()=>{ props.sendSong(props.notes, props.song_name, props.instrument, props.email_address) }} id="submit-send-email">Send Me My Song</button></div></div>
  } else {
    email_modal_text = <div><h3>Song Sent</h3><div><p>Your song has been sent to {props.email_address}. If you would like to send this song to another e-mail address, <button className="button black" onClick={props.backToInstructions}>Click Here</button> </p></div></div>
  }
  return (
    <div id="email-holder" className={classes}>
      <div id="backscreen"></div>
      <div id="email">
        <button onClick={props.hideEmail} className="exit">&times;</button>
        {email_modal_text}
        <div id="triforce"></div>
      </div>
    </div>
  )
}

EmailPresenter.propTypes = {
  notes: PropTypes.array.isRequired,
  song_name: PropTypes.string.isRequired,
  instrument: PropTypes.string.isRequired,
  hideEmail: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  sendSong: PropTypes.func.isRequired,
  email_address: PropTypes.string.isRequired,
  is_email_visible: PropTypes.bool.isRequired,
  visible_text: PropTypes.string.isRequired,
  backToInstructions: PropTypes.func.isRequired
}

export default EmailPresenter
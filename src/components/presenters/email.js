import React from 'react'
import PropTypes from 'prop-types'

import '../../styles/modal.css'

const EmailPresenter = (props) => {
  const classes = props.is_email_visible ? 'active modal-container' : 'modal-container'
  return (
    <div id="email-holder" className={classes}>
      <div id="backscreen"></div>
      <div id="email">
        <button onClick={props.hideEmail} className="exit">&times;</button>
        <h3>E-mail This Song</h3>
        <div>
          <p>Enter the e-mail where you would like the download URL for the song sent below.</p>
          <p>
            <label htmlFor="email_address">E-mail Address</label>
            <input id="email_address" onChange={props.updateEmail} value={props.email_address}/>
          </p>
          <button className="black button" onClick={()=>{
            props.sendSong()
          }}>Send Me My Song</button>
        </div>
        <div id="triforce"></div>
      </div>
    </div>
  )
}

EmailPresenter.propTypes = {
  notes: PropTypes.array.isRequired,
  hideEmail: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  sendSong: PropTypes.func.isRequired,
  email_address: PropTypes.string.isRequired,
  is_email_visible: PropTypes.bool.isRequired
}

export default EmailPresenter
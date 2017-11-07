export function setNotes(notes) {
  return {type: 'set-notes', notes: notes}
}

export function setTitle(title) {
  return {type: 'set-title', title: title}
}

export function setInstrument(instrument) {
  return {type: 'set-instrument', instrument: instrument}
}

export function storeWindowWidth(width){
  return {type: 'store-window-width', width: width}
}

export function toggleModal(visibility, modal_name){
  return {type: 'toggle-modal', visibility: visibility, modal_name: modal_name}
}

export function setEmail(email_address){
  return {type: 'set-email', email_address: email_address}
}

export function setVisibleText(visible_text){
  return {type: 'set-visible-text', visible_text: visible_text}
}
export function setNotes(notes) {
  return {type: 'set-notes', notes: notes}
}

export function setTitle(title) {
  return {type: 'set-title', title: title}
}

export function setInstrument(instrument) {
  return {type: 'set-instrument', instrument: instrument}
}

export function setAudioFileName(name) {
  return {type: 'set-audio-filename', filename: name}
}
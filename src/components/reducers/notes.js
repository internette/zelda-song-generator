const musicSheet = (state = {}, action)=> {
  switch (action.type){
    case 'set-notes':
      return Object.assign({}, state, {
        notes: action.notes.slice(0)
      })
    case 'set-audio-url':
      return Object.assign({}, state, {
        audio_url: action.audio_url
      })
    default: 
      return state
  }
}

export default musicSheet
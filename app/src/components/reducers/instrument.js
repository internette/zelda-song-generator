const instrument = (state = {}, action)=> {
  switch (action.type){
    case 'set-instrument':
      return Object.assign({}, state, {
        instrument: action.instrument
      })
    default: 
      return state
  }
}

export default instrument
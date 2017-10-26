import { combineReducers } from 'redux'
import header from './header'
import musicSheet from './notes'
import instrument from './instrument'
import instructions from './instructions'

const app = combineReducers({
  musicSheet,
  instrument,
  instructions,
  header
})

export default app
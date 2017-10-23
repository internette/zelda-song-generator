import { combineReducers } from 'redux'
import header from './header'
import musicSheet from './notes'
import instrument from './instrument'

const app = combineReducers({
  musicSheet,
  instrument,
  header
})

export default app
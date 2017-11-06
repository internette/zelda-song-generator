import { combineReducers } from 'redux'
import header from './header'
import musicSheet from './notes'
import instrument from './instrument'
import modals from './modals'

const app = combineReducers({
  musicSheet,
  instrument,
  modals,
  header
})

export default app
import { combineReducers } from 'redux'
import header from './header'
import musicSheet from './notes'
import instrument from './instrument'
import modals from './modals'
import email from './email'

const app = combineReducers({
  musicSheet,
  instrument,
  modals,
  email,
  header
})

export default app
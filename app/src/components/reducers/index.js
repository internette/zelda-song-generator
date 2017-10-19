import { combineReducers } from 'redux'
import header from './header'
import musicSheet from './notes'

const app = combineReducers({
  musicSheet,
  header
})

export default app
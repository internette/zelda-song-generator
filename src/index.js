import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import AppReducer from './components/reducers'
import App from './components/app'

import { letters, markovMusic, generateTitle } from './components/exports/markov-music'

import { setTitle, setNotes, setInstrument, storeWindowWidth, toggleModal, setEmail, setVisibleText } from './components/actions'

import registerServiceWorker from './registerServiceWorker'

let store = createStore(AppReducer)

const init_song_name = generateTitle()
store.dispatch(setTitle(init_song_name))
const init_song = markovMusic(init_song_name)
store.dispatch(setNotes(init_song))

store.dispatch(setInstrument('flute'))

store.dispatch(storeWindowWidth(window.innerWidth))

store.dispatch(setEmail(''))

store.dispatch(toggleModal(false, 'instructions'))

store.dispatch(setVisibleText('email-instructions'))

const arrow_key_map = [
  {
    key_code: 37,
    arrow_direction: 'Left'
  },
  {
    key_code: 38,
    arrow_direction: 'Up'
  },
  {
    key_code: 39,
    arrow_direction: 'Right'
  },
  {
    key_code: 40,
    arrow_direction: 'Down'
  }
]

document.addEventListener('keyup', function(ev){
  if(!document.getElementById('email-holder').classList.contains('active') && !document.getElementById('instructions-holder').classList.contains('active')){
    let music_notes = store.getState().musicSheet.notes.slice(0)
    if(ev.keyCode === 8){
      if(music_notes.length > 0 ){
        music_notes.splice(-1, 1)
        store.dispatch(setNotes(music_notes))
      } else {
        alert("There is nothing to remove")
      }
    } else {
      if(music_notes.length < 8){
        let new_note = ''
        if (ev.keyCode === 65 ) {
          new_note = letters.filter((letter_obj)=> {
            if(letter_obj.button === 'A'){
              return letter_obj
            }
            return false
          })[0].letter
        } else if(ev.keyCode >= 37 && ev.keyCode <= 40){
          const matching_direction = arrow_key_map.filter((arrow_key)=> {
            return arrow_key.key_code === ev.keyCode ? arrow_key : false
          })[0].arrow_direction
          new_note = letters.filter((letter_obj)=> {
            if(letter_obj.button === matching_direction){
              return letter_obj
            }
            return false
          })[0].letter
        } else {
          new_note = undefined
        }
        if(new_note){
          music_notes.push({note: new_note, time_value: 0.25})
          store.dispatch(setNotes(music_notes))
        }
      } else {
        if((ev.keyCode >= 37 && ev.keyCode <= 40) || ev.keyCode === 65){
          alert("You've entered the max amount of notes allowed in a Zelda song by Majora's Mask standards")
        }
      }
    }
  }
})

window.addEventListener('resize', function(){
  store.dispatch(storeWindowWidth(window.innerWidth))
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))

registerServiceWorker()

import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import AppReducer from './components/reducers'
import App from './components/app'

import { letters, markovMusic, generateTitle, base_url } from './components/exports/markov-music'

import { setTitle, setNotes, setAudioFileUrl, setInstrument, storeWindowWidth, toggleModal, setEmail } from './components/actions'

import registerServiceWorker from './registerServiceWorker'

let store = createStore(AppReducer);

const init_song_name = generateTitle()
store.dispatch(setTitle(init_song_name))
const init_song = markovMusic(init_song_name)
store.dispatch(setNotes(init_song))

store.dispatch(setInstrument('flute'))

store.dispatch(storeWindowWidth(window.innerWidth))

store.dispatch(setEmail(''))

store.dispatch(toggleModal(false, 'instructions'))

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

function uploadSong(song, song_name){
  return fetch(`${base_url}/make-song`, {
    method: 'post',
    body: JSON.stringify({
      notes: song,
      instrument: store.getState().instrument.name,
      song_name: song_name
    })
  }).then((response)=> {
    return response.text()
  }).then((url)=>{
    store.dispatch(setAudioFileUrl(url))
  })
}

const formatted_song = init_song.map(function(note_obj){
  return letters.filter(function(letter_obj){
    if(letter_obj.letter === note_obj){
      return letter_obj
    }
    return false
  })[0].note
}).join('%20');

uploadSong(formatted_song, init_song_name)

document.addEventListener('keyup', function(ev){
  let music_notes = store.getState().musicSheet.notes.slice(0)
  if(ev.keyCode === 8){
    store.dispatch(setAudioFileUrl(''))
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
        store.dispatch(setAudioFileUrl(''))
        new_note = letters.filter((letter_obj)=> {
          if(letter_obj.button === 'A'){
            return letter_obj
          }
          return false
        })[0].letter
      } else if(ev.keyCode >= 37 && ev.keyCode <= 40){
        store.dispatch(setAudioFileUrl(''))
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
        music_notes.push(new_note)
        store.dispatch(setNotes(music_notes))
      }
    } else {
      if((ev.keyCode >= 37 && ev.keyCode <= 40) || ev.keyCode === 65){
        alert("You've entered the max amount of notes allowed in a Zelda song by Majora's Mask standards")
      }
    }
  }
})

window.addEventListener('resize', function(){
  store.dispatch(storeWindowWidth(window.innerWidth))
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

registerServiceWorker();

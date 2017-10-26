let ngrams = {}
const order = 1
const original_songs = [ "XAYXAY", "AXYAXY", "RYXRYX", "LRALRA", "YRAYRA", "YLRYLR", "LAXYXY", "RLRLYRYR", "LRYYX", "LRLYRL", "XYYLXYR", "AYAYXA", "LRLRLRLR"]

export const preexisting_songs = [
  {
    name: "Song of Time",
    notes: ["Y", "L", "R", "Y", "L", "R"]
  }, {
    name: "Song of Healing",
    notes: ["X", "Y", "R", "X", "Y", "R"]
  }, {
    name: "Song of Soaring",
    notes: ["R", "X", "A", "R", "X", "A"]
  }, {
    name: "Sonata of Awakening",
    notes: ["A", "X", "A", "X", "L", "Y", "L"]
  }, {
    name: "Inverted Song of Time",
    notes: ["R", "L", "Y", "R", "L", "Y"]
  }, {
    name: "Song of Double Time",
    notes: ["Y", "Y", "L", "L", "R", "R"]
  }, {
    name: "Oath To Order",
    notes: ["Y", "R", "L", "R", "Y", "A"]
  }, {
    name: "Goron Lullaby",
    notes: ["L", "Y", "X", "L", "Y", "X", "Y", "L"]
  }, {
    name: "Epona's Song",
    notes: ["A", "X", "Y", "A", "X", "Y"]
  }, {
    name: "New Wave Bossa Nova",
    notes: ["X", "A", "X", "Y", "R", "X", "Y"]
  }, {
    name: "Scarecrow's Song",
    notes: ["L", "R", "L", "R", "L", "R"]
  }
]

export const letters = [
  {letter: "L", note: "D", button: "A"},
  {letter: "X", note: "B", button: "Left"},
  {letter: "A", note: "D2", button: "Up"},
  {letter: "R", note: "F", button: "Down"},
  {letter: "Y", note: "A", button: "Right"}
]  

export const song_parts = {
  songs_pts1: ['Song of', 'Sonata of', 'Oath to', 'Goron', "Epona's", 'New Wave', "Scarecrow's"],
  songs_pts2: ['Time', 'Healing', 'Soaring', 'Awakening', 'Order', 'Lullaby', 'Song', 'Bossa Nova']
}

export function generateTitle(){
  let song_pt1 = getRandomInt(0, 4) === 1 ? 'Inverted ' : ''
  song_pt1 += song_parts.songs_pts1[getRandomInt(0, song_parts.songs_pts1.length)]
  let song_pt2 = getRandomInt(0, 4) === 1 ? 'Double ' : ''
  song_pt2 += song_parts.songs_pts2[getRandomInt(0, song_parts.songs_pts2.length)]
  return song_pt1 + ' ' + song_pt2
}

const min_song_length = Math.min.apply(Math, original_songs.map(function(str) { return str.length; }))
const max_song_length = Math.max.apply(Math, original_songs.map(function(str) { return str.length; }))

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export const base_url = 'https://e8263f25.ngrok.io'

function buildDictionary(){
  for(var i = 0; i < original_songs.length; i++){
    var song = original_songs[i]
    for(var j = 0; j <= song.length - order; j++){
      var gram = song.substring(j, j + order);
      if(!ngrams[gram]){
        ngrams[gram] = []
      }
      ngrams[gram].push(song.charAt(j + order))
    }
  }
}

export function markovMusic(song_title){
  buildDictionary();
  // We add 1 to the max_song_length because the max value is exclusive, but we want it to be inclusive
  const matching_songs = preexisting_songs.filter(function(song_obj){
    if(song_obj.name === song_title){
      return song_obj
    }
    return false
  })
  if(matching_songs.length > 0){
    return matching_songs[0].notes
  } else {
    var song_length = getRandomInt(min_song_length, max_song_length + 1)
    var first_letter_obj = letters[getRandomInt(0, letters.length)]
    var first_letter = first_letter_obj.letter
    var currentGram = first_letter
    var result = currentGram
    if(/double/gi.test(song_title)){
      result += currentGram
    }
    while(result.length < song_length){
      var possibilities = ngrams[currentGram]
      var next = possibilities[getRandomInt(0, possibilities.length)]
      result += next
      if(/double/gi.test(song_title)){
        result += next
      }
      currentGram = result.substring(result.length - order, result.length)
    }
    return result.split('')
  }
}


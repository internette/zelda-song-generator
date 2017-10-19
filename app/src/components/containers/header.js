import { connect } from 'react-redux'
import HeaderPresenter from '../presenters/header'
import { getRandomInt } from '../exports/random'
import { setTitle } from '../actions'

const songs_pts1 = ['Song of', 'Sonata of', 'Oath to', 'Goron', "Epona's", 'New Wave', "Scarecrow's"];
const songs_pts2 = ['Time', 'Healing', 'Soaring', 'Awakening', 'Order', 'Lullaby', 'Song', 'Bossa Nova'];

const mapStateToProps = (state, ownProps) => {
  return {
    song_title: (function(){
      const song_pt1 = songs_pts1[getRandomInt(0, songs_pts1.length)];
      const song_pt2 = songs_pts2[getRandomInt(0, songs_pts2.length)];
      return state.header.title ? state.header.title :  song_pt1 + ' ' +  song_pt2
    })()
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createRandomSongTitle: ()=>{
      const song_pt1 = songs_pts1[getRandomInt(0, songs_pts1.length)];
      const song_pt2 = songs_pts2[getRandomInt(0, songs_pts2.length)];
      dispatch(setTitle(song_pt1 + ' ' + song_pt2))
    },
    createRandomSong: ()=> {

    },
    clearSong: ()=> {
      
    },
  }
}

const Header = connect(mapStateToProps,mapDispatchToProps)(HeaderPresenter)

export default Header
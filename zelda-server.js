'use strict'

const process = require('process'), 
fs = require('fs'), 
path = require('path'),
winston = require('winston'), 
express = require('express'),
bodyParser = require('body-parser'), 
serveIndex = require('serve-index'),
cors = require('cors'),
ffmpeg = require('fluent-ffmpeg'),
router = express.Router()
const app = express()
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// Setting up logger
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({ filename: 'server-data.log' })
  ]
});


app.use(express.static(path.join(__dirname, 'app', 'build')))

app.get("/api/make-song", (req, res)=> {
  let params = req.query
  const file_urls = params.notes.split(' ').map(function(note){
    return __dirname + '/assets/sound_clips/' + params.instrument + '_' + note + '.mp3' 
  });
  fs.readdir(__dirname + '/assets/user_songs', function(err, files) {
    let song_name = 'usersong_'
    if (err) {
      // some sort of error
      console.log(err)
    } else {
      let song_num = 0;
      const filtered_files = files.filter(function(file){
        return file !== '.DS_Store' ? file : undefined
      })
      if (filtered_files.length) {
        const file_nums = filtered_files.map(function(file){
          return parseInt(file.replace('usersong_', ''))
        }).sort(function(a, b){return a - b})
        song_num = file_nums[file_nums.length - 1] + 1
      }
      song_name += song_num
      song_name += '.mp3'
    }

    var chainedInputs = file_urls.reduce(
      (result, inputItem) => {
        const sound_length = getRandomIntInclusive(8, 13) / 10
        return result.addInput(inputItem)
                     .inputOption('-t ' + sound_length)
      }, ffmpeg()).on('end', function() {
      console.log('files have been merged succesfully');
      res.send(__dirname + '/assets/user_songs/' + song_name)
    })
    .on('error', function(err) {
      console.log('an error happened: ' + err.message);
    })
    .outputOptions('-metadata', 'title="'+params.song_title.replace(/(%20)/g, ' ').replace(/%27/g, "'") +'"')
    .mergeToFile(__dirname+'/assets/user_songs/' + song_name);
    });
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

var CronJob = require('cron').CronJob;
new CronJob('00 00 * * * *', function() {
  fs.readdir(__dirname + '/assets/user_songs' , function(err, files) {
    if(files.length > 0 ){
      files.forEach(function(file){
        fs.unlinkSync(path.join(__dirname, 'assets', 'user_songs', file));
      })
    }
  })
}, null, true, 'America/New_York')

const server = app.listen(process.env.PORT || 8080, function() {
  logger.log('info', 'Listening on port %d', server.address().port)
})
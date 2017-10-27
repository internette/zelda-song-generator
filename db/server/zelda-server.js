'use strict'

const process = require('process'), 
fs = require('fs'), 
path = require('path'),
winston = require('winston'), 
express = require('express'),
bodyParser = require('body-parser'), 
serveIndex = require('serve-index'),
cors = require('cors'),
ffmpeg = require('fluent-ffmpeg')
const app = express()
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

app.use('/public/sound_clips', serveIndex(path.join(__dirname, '/sound_clips')))
app.use('/public/sound_clips', express.static(path.join(__dirname, '/sound_clips')))
app.use('/public/user_songs', serveIndex(path.join(__dirname, '/user_songs')))
app.use('/public/user_songs', express.static(path.join(__dirname, '/user_songs')))

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

app.get('/make-song', function(req, res){
  let params = req.originalUrl.replace('/make-song?','')
  params = params.split('&').map(function(str){
    var parsed_str = str.split('=');
    if(parsed_str[0]==='notes'){
      parsed_str[1] = parsed_str[1].split('%20');
    } 
    return {
      key: parsed_str[0],
      value: parsed_str[1]
    }
  });
  const ec2_url = 'http://ec2-34-228-201-183.compute-1.amazonaws.com/public'
  const file_urls = params[0].value.map(function(note){
    return ec2_url + '/sound_clips/' + params[1].value + '_' + note + '.mp3' 
  });
  fs.readdir(__dirname + '/user_songs', function(err, files) {
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
      res.send(ec2_url+'/user_songs/' + song_name)
    })
    .on('error', function(err) {
      console.log('an error happened: ' + err.message);
    })
    .outputOptions('-metadata', 'title="'+params[2].value.replace(/(%20)/g, ' ').replace(/%27/g, "'") +'"')
    .mergeToFile(__dirname.replace(/server/, 'audio')+'/user_songs/' + song_name);
    });
});

var CronJob = require('cron').CronJob;
new CronJob('00 00 * * * *', function() {
  fs.readdir(__dirname.replace('server', 'audio/user_songs'), function(err, files) {
    files.forEach(function(file){
      fs.unlinkSync(path.join(__dirname.replace('server', 'audio/user_songs'), file));
    })
  })
}, null, true, 'America/New_York');

const server = app.listen(3000, function() {
  logger.log('info', 'Listening on port %d', server.address().port)
})
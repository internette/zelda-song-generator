const path = require('path'),
express = require('express'),
bodyParser = require('body-parser')
const app = express()
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

app.use(express.static(path.join(__dirname, 'app', 'build')))
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const server = app.listen(process.env.PORT || 8080, function() {
  logger.log('info', 'Listening on port %d', server.address().port)
})
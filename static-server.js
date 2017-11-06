const path = require('path'),
express = require('express'),
cors = require('cors'),
winston = require('winston'),
bodyParser = require('body-parser')
const app = express()

// Setting up logger
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({ filename: 'server-data.log' })
  ]
});

app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(cors())

app.use(express.static(path.join(__dirname, 'build')))
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

const server = app.listen(process.env.PORT || 3000, function() {
  logger.log('info', 'Listening on port %d', server.address().port)
})
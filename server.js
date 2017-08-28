const app = require('./app.js')
const httpServer = require('http').Server(app)
const io = require('socket.io')(httpServer)
const initializeSocketIO = require('./ideahacks').communication.initializeSocketIO(io)

httpServer.listen(app.get('port'), () => {
  console.log('Server started on port: ', app.get('port'))
})

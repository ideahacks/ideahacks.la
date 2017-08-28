const app = require('./app.js')
const httpServer = require('http').Server(app)
const io = require('socket.io')(httpServer)

io.of('/admin/teams').on('connection', (socket) => {
  socket.on('team created', teamData => {
    socket.broadcast.emit('team created', teamData)
  })
  socket.on('user typing', () => {
    socket.broadcast.emit('user typing')
  })
  socket.on('no longer typing', () => {
    socket.broadcast.emit('no longer typing')
  })
})

httpServer.listen(app.get('port'), () => {
  console.log('Server started on port: ', app.get('port'))
})

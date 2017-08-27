const app = require('./app.js')
const httpServer = require('http').Server(app)
const io = require('socket.io')(httpServer)

io.of('/admin/teams').on('connection', (socket) => {
  socket.on('team created', teamData => {
    socket.broadcast.emit('team created', teamData)
  })
})

httpServer.listen(app.get('port'), () => {
  console.log('Server started on port: ', app.get('port'))
})

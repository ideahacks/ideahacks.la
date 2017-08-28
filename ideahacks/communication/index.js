const initializeSocketIO = io => {
  io.of('/admin/teams').on('connection', socket => {
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
}

module.exports = {
  initializeSocketIO
}

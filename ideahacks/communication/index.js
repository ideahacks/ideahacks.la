const initializeSocketIO = io => {
  // Admin Team page's sockets
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

  // Admin parts page's sockets
  io.of('/admin/parts').on('connection', socket => {
    socket.on('part created', partData => {
      socket.broadcast.emit('part created', partData)
    })
    socket.on('part transformation', transformation => {
      socket.broadcast.emit('part transformation', transformation)
    })
  })
}

module.exports = {
  initializeSocketIO
}

const app = require('./app.js')

app.listen(app.get('port'), () => {
  console.log('Server started on port: ', app.get('port'))
})

const app = require('./app.js')

app.listen(app.get('port'), () => {
  console.log('Sever started on port: ', app.get('port'))
})

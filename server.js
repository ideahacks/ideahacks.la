const app = require('./expressConfig.js')

app.listen(app.get('port'), () => {
  console.log('Sever started on port: ', app.get('port'))
})

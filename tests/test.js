var request = require('supertest')

describe('Application router...', function() {
  let server
  beforeEach(function() {
    delete require.cache[require.resolve('../app')]
    let app = require('../app')
    server = 0
    server = app.listen(3000, () => {})
  })

  afterEach(function(done) {
    server.close(done)
  })

  it('responds to /', function(done) {
    request(server)
      .get('/')
      .expect(200, done)
  })

  it("404's everything else", function(done) {
    request(server)
      .get('/asldfjalsfk')
      .expect(404, done)
  })
})

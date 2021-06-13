const request = require("supertest")

describe("Application...", () => {
	let server

	beforeEach(() => {
		delete require.cache[require.resolve("../app")]
		let app = require("../app")
		server = 0
		server = app.listen(3000, () => {})
	})

	afterEach(done => {
		server.close(done)
	})

	it("responds to /", done => {
		request(server)
			.get("/")
			.expect(200, done)
	})

	it("responds to /team", done => {
		request(server)
			.get("/team")
			.expect(200, done)
	})

	it("responds to /history", done => {
		request(server)
			.get("/history")
			.expect(200, done)
	})

	it("responds to /login", done => {
		request(server)
			.get("/login")
			.expect(200, done)
	})

	it("responds to /registration", done => {
		request(server)
			.get("/registration")
			.expect(200, done)
	})

	it("responds to /privacy", done => {
		request(server)
			.get("/privacy")
			.expect(200, done)
	})

	it("404's everything else", done => {
		request(server)
			.get("/asldfjalsfk")
			.expect(404, done)
	})
})

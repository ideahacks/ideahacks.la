const app = require("./app.js")
const httpServer = require("http").Server(app)

httpServer.listen(app.get("port"), () => {
	console.log("Server started on port: ", app.get("port"))
})

const next = require("next")

// note the "https" not "http" required module. You will get an error if trying to connect with https
const https = require("https")

const fs = require("fs")

const hostname = "localhost"
const port = Number(process.env.PORT) || 3000
const dev = process.env.NODE_ENV !== "production"

const app = next({ dev, hostname, port })

const handle = app.getRequestHandler()

app.prepare().then(() => {
	let server
	if (process.env.CERT && process.env.CERT_KEY) {
		const sslOptions = {
			key: fs.readFileSync(process.env.CERT_KEY || ""),
			cert: fs.readFileSync(process.env.CERT || "")
		}
		server = https.createServer(sslOptions, (req, res) => {
			return handle(req, res)
		})
	} else
		server = http.createServer((req, res) => {
			return handle(req, res)
		})
	server.listen(port, () => {
		console.log("> Ready on https://localhost:" + port)
	})
})

const next = require("next")

var sslRootCAs = require("ssl-root-cas")
sslRootCAs.inject()

// note the "https" not "http" required module. You will get an error if trying to connect with https
const https = require("https")
const http = require("http")
const fs = require("fs")

const hostname = "local.afterlifehorizon.net"
const port = Number(process.env.PORT) || 3000
const dev = process.env.NODE_ENV !== "production"

const app = next({ dev, hostname, port })

const handle = app.getRequestHandler()

app.prepare().then(() => {
	let server
	if (process.env.CERT && process.env.CERT_KEY) {
		let cas = sslRootCAs.create()
		if (process.env.CA_CERT) cas.addFile(process.env.CA_CERT)

		const tlsContext = {
			key: fs.readFileSync(process.env.CERT_KEY),
			cert: fs.readFileSync(process.env.CERT),
			ca: cas,
			servername: hostname
		}

		server = https.createServer(tlsContext, (req, res) => {
			return handle(req, res)
		})
	} else
		server = http.createServer((req, res) => {
			return handle(req, res)
		})
	server.listen(port, () => {
		console.log(`> Ready on ${hostname}`)
	})
})

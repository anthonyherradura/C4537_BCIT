const http = require("http");
const { getDate, getJsonData } = require("./modules/utils.js")
const PORT = 8888;

const server = http.createServer(async function (req, res) {
    const message = await getJsonData();
    const fullUrlString = `http://${req.headers.host}${req.url}`;
    const parsedUrl = new URL(fullUrlString);
    const name = parsedUrl.searchParams.get("name");

    if (req.method == "GET" && req.url == `/getDate/?name=${name}`) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(message.replace("%1", name) + getDate());
    }
})

server.listen(PORT, () => {
    console.log(`Server is successfully running at http://localhost:${PORT}/`);
});
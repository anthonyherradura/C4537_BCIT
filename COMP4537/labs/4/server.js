const http = require("http");
const { getDate, getJsonData } = require("./modules/utils.js")
const PORT = 8888;

const server = http.createServer(async function (req, res) {
    const message = await getJsonData();
    const fullUrlString = `http://${req.headers.host}${req.url}`;
    const parsedUrl = new URL(fullUrlString);
    

    if (req.method == "GET" && req.url == `COMP4537/labs/4/getDate`) {
        const name = parsedUrl.searchParams.get("name");
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(message.replace("%1", name) + getDate());
    }
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
})

server.listen(PORT, () => {
    console.log(`Server is successfully running at http://localhost:${PORT}/`);
});
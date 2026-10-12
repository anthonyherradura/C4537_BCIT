const http = require("http");
const { getDate, getJsonData } = require("./modules/utils.js")
const PORT = process.env.PORT || 8888;

const server = http.createServer(async function (req, res) {
    const fullUrlString = `http://${req.headers.host}${req.url}`;
    const parsedUrl = new URL(fullUrlString);
    const pathname = parsedUrl.pathname.replace(/\/$/, "");
    

    if (req.method === "GET" && pathname === `/COMP4537/labs/4/getDate`) {
        const name = parsedUrl.searchParams.get("name");
        const message = await getJsonData();
        console.log(name);
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(message.replace("%1", name) + getDate());
    }
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
})

server.listen(PORT, () => {
    console.log();
});
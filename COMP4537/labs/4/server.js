const http = require("http");
const { getDate, getJsonData } = require("./modules/utils.js")
const PORT = 8888;

const server = http.createServer(async function (req, res) {
    const fullUrlString = `http://${req.headers.host}${req.url}`;
    const parsedUrl = new URL(fullUrlString);
    let pathname = parsedUrl.pathname
    
    if (pathname.length > 1 && pathname.endsWith("/")) {
        pathname = pathname.slice(0, -1)
    }
    

    if (req.method === "GET" && pathname === `/COMP4537/labs/4/getDate`) {
        const name = parsedUrl.searchParams.get("name");
        const message = await getJsonData();
        console.log(name);
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        return res.end(`<p style="color: blue;">${message.replace("%1", name) + getDate()}</p>`);
    }
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found (type /COMP4537/labs/4/getDate/?name={any value here} as the URL parameters)");
})

server.listen(PORT, () => {
    console.log("The server is running on http://localhost:" + PORT);
});
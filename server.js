const http = require("http");
const app = require('./marvel-api/app');
const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    //named pipe
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const port = normalizePort(process.env.PORT || 8888);

const onError = (error) => {
  if (error.syscall != "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACES":
      console.error(bind + "requires elevated priviledge");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + "is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () =>{
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port http://localhost:" + port;
  console.log("Listening on "+ bind);
}

app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

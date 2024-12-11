const jsonServer = require('json-server');
const server = JsonServer.create();
const router = jsonServer.router('db.json');
const middleware = jsonServer.defaults();

server.use(middleware);
server.use((req, res, next) => {
  console.log('Request received');
  res.header('Access-control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-type, Accept'
  );
  next();
});

server.use(router)

server.listen(3001, () => {
    console.log("JSON server is running")
})


const http=require('http');
const app=require('../app.js');
const port = process.env.PORT || 3001;
const server = http.createServer(app.app);
server.listen(port , () => {
    console.log(`server is up and running on port: ${port}`);
});
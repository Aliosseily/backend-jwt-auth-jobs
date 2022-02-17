// const http = require('http')
const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");
// instead of writng try catch manulally in every function use this libaray
require("express-async-errors");

// midlleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticationMiddleware = require("./middleware/authentication");

// app.get("/", (req, res) => {
//   res.status(200).send("HEllo world!");
// });

app.use(express.json());
const authRoutes = require("./routes/auth");
const authJobs = require("./routes/jobs");

// app.use(authenticationMiddleware) use authenticationMiddleware only to authenticate jobs routes not user
app.use(`${process.env.MAIN_DOMAIN}/auth`, authRoutes); ///pai/v1/auth/{routes in authRoutes}
app.use(`${process.env.MAIN_DOMAIN}/jobs`, authenticationMiddleware, authJobs);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 6000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

// const server = http.createServer((req, res) => {
//   // console.log(req.method)
//   const url = req.url
//   // home page
//   if (url === '/') {
//     res.writeHead(200, { 'content-type': 'text/html' })
//     res.write('<h1>home page</h1>')
//     res.end()
//   }
//   // about page
//   else if (url === '/about') {
//     res.writeHead(200, { 'content-type': 'text/html' })
//     res.write('<h1>about page</h1>')
//     res.end()
//   }
//   // 404
//   else {
//     res.writeHead(404, { 'content-type': 'text/html' })
//     res.write('<h1>page not found!</h1>')
//     res.end()
//   }
// })
//server.listen(5000)

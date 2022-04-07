const dotenv = require("dotenv");
const express = require("express");
const app = express();
const port = process.env.PORT || 2709;

dotenv.config({ path: "./config.env" });
require("./db/conn.js");
const middleware = (req, resp, next) => {
  console.log("Hello from middlewarew");
  next();
};
// With this method backend will understand json data
app.use(express.json());
// this will make work of Router
app.use(require("./Router/auth"));
app.get("/", (req, resp) => {
  resp.send("<h1>Hello world From Server app.js</h1>");
});

// //When we will run about page it will first run middleware and we will perform our operation and we run next() method which will trigered our about page
// app.get("/about", middleware, (req, resp) => {
//   console.log("hELLO FROM  about page");
//   resp.send("<h1>Hello world From Server ABouyt PAGe</h1>");
// });

app.listen(port, () => {
  console.log("Server is Running",port);
});

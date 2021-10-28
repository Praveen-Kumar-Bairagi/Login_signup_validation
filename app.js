const express = require("express");
const app = express();
const fileupload = require("express-fileupload");
app.use(express.json());
require("dotenv").config();
app.use(express.json());
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routes/loginsignup"));
app.use("/", require("./routes/product"));

const Port = process.env.PORT || 2043;

app.listen(Port, () => {
  console.log(`running.....port ${Port}`);
});

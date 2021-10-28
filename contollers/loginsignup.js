const knex = require("../database/db");
const path = require("path");
var fs = require("fs");

// /////////////////////signup///////////////////
signup = (req, res) => {
  const bodydata = req.body;
  if (bodydata.email == undefined) {
    return res.send({ error: "Email can't be null" });
  }
  if (bodydata.password == undefined) {
    return res.send({ error: "password can't be null" });
  }
  if (bodydata.fullName == undefined) {
    return res.send({ error: "fullName can't be null" });
  }
  if (req.files.userImage == undefined) {
    return res.send({ error: "userImage can't be null" });
  }
  var d = Date.now();
  req.files["userImage"].mv("upload/" + d + bodydata.fullName + ".jpg");
  var path = "upload/" + d + bodydata.fullName + ".jpg";
  // });
  knex
    .select("*")
    .from("userinformation")
    .where("email", bodydata.email)
    .then((data) => {
      if (data.length < 1) {
        const userdata = {
          email: bodydata.email,
          password: bodydata.password,
          userImage: path,
          fullName: bodydata.fullName,
        };
        knex("userinformation")
          .insert(userdata)
          .then((data) => {
            console.log(data);
            res.send({ data: "insert" });
          });
      } else {
        res.send("data already exits you can login");
      }
    });
};
//////////////////////////////////////////////////////////

login = (req, res) => {
  if (req.body.email == undefined) {
    return res.send({ error: "Email can't be null" });
  }
  if (req.body.password == undefined) {
    return res.send({ error: "password can't be null" });
  }
  knex
    .select("*")
    .from("userinformation")
    .where("email", req.body.email)
    .then((data) => {
      console.log(data);
      if (data < 1) {
        res.send("1st signup");
      } else if (data[0].password != req.body.password) {
        res.send("you input wrong password ");
      } else {
        res.send("login succed");
      }
    });
};

module.exports = { signup, login };

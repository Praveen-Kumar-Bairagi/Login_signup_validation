const knex = require("../database/db");
const path = require("path");
var fs = require("fs");
////////////////////////////postdata//////////////////

const postdata1 = (req, res) => {
  if (req.body.productName == undefined) {
    return res.send({ error: "productName can't be null" });
  }
  if (req.body.productType == undefined) {
    return res.send({ error: "productType can't be null" });
  }
  if (req.body.size == undefined) {
    return res.send({ error: "size can't be null" });
  }
  if (req.body.quantity == undefined) {
    return res.send({ error: "quantity can't be null" });
  }
  if (req.body.productColour == undefined) {
    return res.send({ error: "productColour can't be null" });
  }
  if (req.files.productImage == undefined) {
    return res.send({ error: "productImage can't be null" });
  }
  var path = [];
  for (image of req.files["productImage"]) {
    var d = Date.now();
    image.mv("upload/" + d + req.body.productName + ".jpg");
    path.push("upload/" + d + req.body.productName + ".jpg");
  }
  path = path.join(" | ");
  console.log(path);
  const userdata = {
    productName: req.body.productName,
    productType: req.body.productType,
    size: req.body.size,
    quantity: req.body.quantity,
    productColour: req.body.productColour,
    productImage: path,
  };
  knex("userProduct")
    .insert(userdata)
    .then((data) => {
      console.log(data);
      res.send({ status: "success", inserted: userdata });
    })
    .catch((er) => {
      console.log(er);
      res.json({ message: er });
    });
};

///////////////////////////getall/////////////////////

const getalldata1 = (req, res) => {
  knex
    .select("*")
    .from("userProduct")
    .then((data) => {
      console.log(data);
      res.json({ data: data });
    })
    .catch((er) => {
      console.log(er);
      res.json({ message: er });
    });
};

//////////////////////////////////updatebyid//////////////////////

const updatebyid = (req, res) => {
  knex("userProduct")
    .where("id", "=", req.params.id)
    .update({
      productName: req.body.productName,
      productType: req.body.productName,
      size: req.body.size,
      quantity: req.body.quantity,
      productColour: req.body.productColour,
      //  productImage
    })
    .then((data) => {
      console.log(data);
      res.send("updated successfully");
    })
    .catch((er) => {
      console.log(er);
      res.json({ message: er });
    });
};

///////////////////////////////deletebyid///////////////////

const deletebyid = (req, res) => {
  knex("userProduct")
    .where("id", parseInt(req.params.id))
    .del()
    .then((data) => {
      console.log(data);
      res.send("deleted successfully");
    })
    .catch((er) => {
      console.log(er);
      res.json({ message: er });
    });
};

module.exports = { postdata1, getalldata1, updatebyid, deletebyid };

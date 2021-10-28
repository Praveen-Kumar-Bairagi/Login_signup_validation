const router = require("express").Router();
const {
  postdata1,
  getalldata1,
  updatebyid,
  deletebyid,
} = require("../contollers/product");

router.post("/products", postdata1);
router.get("/products", getalldata1);
router.put("/products/:id", updatebyid);
router.delete("/products/:id", deletebyid);

module.exports = router;

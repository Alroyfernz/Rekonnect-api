const router = require("express").Router();
const adminModel = require("../model/admin_model");

router.post("/add", async (req, res) => {
  const newAdmin = new adminModel(req.body);
  try {
    const savedAdmin = await newAdmin.save();
    return res.status(200).json(savedAdmin);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const fetchedAdmin = await adminModel.findOne({ email: req.body.email });
    if (fetchedAdmin.password !== req.body.password) {
      return res.status(500).json("incorrect password");
    }
    return res.status(200).json(fetchedAdmin);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;

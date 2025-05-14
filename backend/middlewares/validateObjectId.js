const mongoose = require("mongoose");

// check id is valid before send it to DB
module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid ID!" });
  }
  next();
};

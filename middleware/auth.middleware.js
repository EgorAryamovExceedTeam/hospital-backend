const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).send({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

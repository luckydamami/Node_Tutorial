const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token required!" });
  //Token extract from user request
  const token = req.headers.authorization.split(" ")[1];
  //if token does not exit in user req
  if (!token) return res.status(401).json({ message: "User Unautherized!" });
  try {
    //token verification
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    //payload data ko req object se attach kar diya aur
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token!" });
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRETKEY, { expiresIn: 3000 });
};

module.exports = { generateToken, jwtAuthMiddleware };

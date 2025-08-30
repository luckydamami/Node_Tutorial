const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  //extract the jwt token from the request header
  const token = req.headers.authorization.split(" ")[1];
  //agar token nahi mila to
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    //verify the JWT token, its return a payload(user info)
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    //Attach payload to the user request object
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ err: "Invalid Token!" });
  }
};

function generateToken(userData) {
  const jwtToken = jwt.sign(userData, process.env.JWT_SECRETKEY);
  return jwtToken;
}

module.exports = { jwtAuthMiddleware, generateToken };

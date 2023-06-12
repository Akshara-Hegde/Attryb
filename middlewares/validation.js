const jwt = require('jsonwebtoken')

 function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send("Access denied");

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).send("Invalid token");

    req.user = user;
    next();
  });
}

 function authenticateAdminToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
 
  console.log(token)
  if (!token) return res.status(401).send("Access denied");

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      console.log({ err }, process.env.SECRET_KEY);
      return res.status(403).send("Invalid token");
    }

    if (user.role !== "admin") return res.status(403).send("Access denied");

    req.user = user;
     console.log(req.user);
    next();
  });
}


module.exports = {authenticateAdminToken,authenticateToken}
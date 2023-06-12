const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user.js");
const saltRounds = 10;

 const userSignup = async (req, res) => {
  const { email, password } = req.body;
console.log(email,password)
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    password: hashedPassword,
    role: "user",
  });

  try {
    const accessToken = jwt.sign(
      { email: user.email, role: user.role },
      process.env.SECRET_KEY
    );
    const savedUser = await user.save();

    res.json({ accessToken });
  } catch (err) {
    console.log(err);
    res.status(400).send("Error creating user");
  }
};

 const userLogin = async (req, res) => {
  const { email, password } = req.body.user;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) return res.status(400).send("Invalid email or password");

  const accessToken = jwt.sign(
    { email: user.email, role: user.role },
    process.env.SECRET_KEY
  );
  

  res.json({ accessToken });
};


module.exports = {userLogin,userSignup}
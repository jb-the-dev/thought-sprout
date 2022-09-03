const bcrypt = require("bcryptjs");
const asyncErrorBoundary = require("../../errors/asyncErrorBoundary");

const User = require("../../models/user");

// VALIDATORS
async function userExists(req, res, next) {
  const user = await User.findById(req.params.userId || req.body.userId);
  if (user) {
    res.locals.user = user;
    return next();
  }
  next({ status: 404, message: "User not found." });
}
//TODO create hasValidProperties validator for update

// HANDLERS
async function listUsers(req, res) {
  const users = await User.find({});
  res.json(users);
}

function getUser(req, res) {
  res.json(res.locals.user);
}

async function createUser(req, res) {
  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
  });
  const savedUser = await user.save();
  res.json(savedUser);
}

async function updateUser(req, res) {
  const { firstName, lastName } = req.body;
  const userToUpdate = res.locals.user;

  if (firstName) {
    userToUpdate.firstName = firstName;
  }
  if (lastName) {
    userToUpdate.lastName = lastName;
  }
  const savedUpdatedUser = await userToUpdate.save();
  res.json(savedUpdatedUser);
}

async function deleteUser(req, res) {
  const userToDelete = await User.findByIdAndDelete(res.locals.user._id);
  res.json(userToDelete);
}

async function loginUser(req, res) {
  console.log("body", req.body);
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  console.log("email", { email });
  if (!existingUser) {
    res.status(400).send("Invalid email/password");
    res.end();
  }
  const isValid = await bcrypt.compare(password, existingUser.password); //? change property to "passwordHash"?
  if (!isValid) {
    res.status(400).send("Invalid email/password");
    res.end();
  }
  console.log("req.session", req.session);
  req.session.userId = existingUser._id;
  res.end();
}

module.exports = {
  userExists,
  list: asyncErrorBoundary(listUsers),
  get: [asyncErrorBoundary(userExists), getUser],
  create: asyncErrorBoundary(createUser),
  update: [asyncErrorBoundary(userExists), asyncErrorBoundary(updateUser)],
  destroy: [asyncErrorBoundary(userExists), asyncErrorBoundary(deleteUser)],
  login: asyncErrorBoundary(loginUser),
};

const mongoose = require("mongoose");
const User = require("../models/user.model");

async function getAllUsers(req, res) {
  const users = await User.find({});
  res.status(200).send(users);
}

async function getUserById(req, res) {
  const id = req.params.id;
  const user = await User.findById(id);
  res.status(200).send(user);
}

async function deleteUserById(req, res) {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res
    .status(200)
    .send({ message: `user with the ID:${id} deleted successfully` });
}

async function UpdateUserById(req, res) {
  const id = req.params.id;
  await User.findByIdAndUpdate(id, req.body);
  res
    .status(200)
    .send({ message: `user with the ID:${id} updated successfully` });
}
module.exports = {
  getAllUsers,
  deleteUserById,
  UpdateUserById,
  getUserById,
};

const { User } = require("../models");

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.error(err); 
        res.status(500).json({ message: "Error fetching users", error: err });
      });
  },

  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .select("-__v")
      .populate("friends")
      .populate("thoughts")
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user found with this id!" });
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.error(err);
        res.status(400).json({ message: "Error fetching user by ID", error: err });
      });
  },

  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.error(err);
        res.status(400).json({ message: "Error creating user", error: err });
      });
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId }, body, {
      new: true,
      runValidators: true
    })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user found with this id!" });
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.error(err);
        res.status(400).json({ message: "Error updating user", error: err });
      });
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user found with this id!" });
        }
        res.json({ message: "User deleted successfully" });
      })
      .catch(err => {
        console.error(err);
        res.status(400).json({ message: "Error deleting user", error: err });
      });
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } }, 
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          return res.status(404).json({ message: "No user found with this id!" });
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.error(err);
        res.status(400).json({ message: "Error adding friend", error: err });
      });
  },

  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.error(err);
        res.status(400).json({ message: "Error removing friend", error: err });
      });
  },
};

module.exports = userController;

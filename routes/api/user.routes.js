const router = require("express").Router();
const User = require("../../models/User");
const Thought = require("../../models/Thought");

// Get all users
router.get("/", async (req, res) => {
  try {
    const result = await User.find({});
    res.json({ result });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Get a User by _id, + Thought and Friend Data
router.get("/:id", async (req, res) => {
  try {
    const result = await User.findById(req.params.id).populate(['thoughts', 'friends']);
    res.json({ result });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Post a new user
router.post("/", async (req, res) => {
  try {
    const result = await User.create(req.body);
    res.json({ result });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Put to update User by _id
router.put("/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ result });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Delete User by _id
router.delete("/:id", async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    res.json({ result });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// POST to add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.friends.push(req.params.friendId);
    const result = await user.save();

    res.json({ result });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Delete: remove friend from user's list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.friends = user.friends.filter(friend => friend != req.params.friendId);

    const result = await user.save();

    res.json({ result });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;

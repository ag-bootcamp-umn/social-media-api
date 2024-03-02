const router = require("express").Router();
const User = require("../../models/User");
const Thought = require("../../models/Thought");

// Get all thoughts
router.get('/', async (req, res) => {
  try {
    const result = await Thought.find({});
    res.json({ result });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Get a single thought by id
router.get('/:id', async (req, res) => {
  try {
    const result = await Thought.findById(req.params.id);
    res.json({ result });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Post to create a new thought
router.post('/', async (req, res) => {
  try {
    const { thoughtText, username, userId } = req.body;
    const result = await Thought.create({ thoughtText, username });
    const user = await User.findOne({ username: username });
    user.thoughts.push(result._id)
    const userResult = await user.save();
    res.json({ result, userResult });
    console.log(userResult);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// PUT to update a thought by its _id
router.put('/:id', async (req, res) => {
  try {
    const result = await Thought.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ result });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Delete by id
router.delete("/:id", async (req, res) => {
  try {
    const result = await Thought.findByIdAndDelete(req.params.id);
    res.json({ result });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Post a reaction to a thought's reactions array
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    thought.reactions.push(req.body);
    const result = await thought.save();
    res.json({ result });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    thought.reactions = thought.reactions.filter(reac => reac.reactionId != req.params.reactionId);
    const result = await thought.save();
    res.json({ result });
  } catch (err) {
    return res.status(500).json(err);
  }
});



module.exports = router;
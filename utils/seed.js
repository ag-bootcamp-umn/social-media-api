const connection = require("../config/connection");
const { User, Thought } = require("../models");

const { users, thoughts } = require("./data.json");

connection.on("error", (err) => err);

connection.once("open", async () => {
  try {
    let usersCheck = await connection.db
      .listCollections({ name: "users" })
      .toArray();
    if (usersCheck.length) {
      await connection.dropCollection("users");
    }

    let thoughtsCheck = await connection.db
      .listCollections({ name: "thoughts" })
      .toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection("thoughts");
    }

    // Seed users
    const seededUsers = await User.insertMany(users);

    // Seed thoughts and associate with users
    const seededThoughts = await Thought.insertMany(thoughts);
    for (const thought of seededThoughts) {
      const user = seededUsers.find(u => u.username === thought.username);
      if (user) {
        user.thoughts.push(thought._id);
        await user.save();
      }
    }

    console.info("Seeding Complete");
  } catch (error) {
    // Display any errors in the console
    console.error("Error seeding database:", error);
  } finally {
    // Close the database connection
    await connection.close();
    process.exit(0);
  }
});

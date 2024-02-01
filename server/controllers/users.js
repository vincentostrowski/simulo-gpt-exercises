const User = require("../models/user");
const admin = require("../utils/firebaseAdmin");

const createUserInFirebase = async ({ email, password, username }) => {
  return await admin.auth().createUser({
    email,
    password,
    displayName: username,
  });
};

const createUserInMongo = async ({ username, email, fireBaseId }) => {
  const user = new User({
    username,
    email,
    fireBaseId,
  });
  return await user.save();
};

const createUser = async (request, response) => {
  const { username, email, password } = request.body;
  try {
    const userSaved = await createUserInFirebase({ email, password, username });
    const userRecord = await createUserInMongo({
      email,
      fireBaseId: userSaved.uid,
      username,
    });
    response.status(201).json(userRecord);
  } catch (error) {
    if (userSaved) {
      await admin.auth().deleteUser(userSaved.uid);
    }
    if (error.code === 11000) {
      return response.status(400).json({ error: "Username already in use" });
    } else if (error.code === "auth/email-already-exists") {
      return response.status(400).json({ error: "Email already in use" });
    } else if (error.code === "auth/invalid-email") {
      return response.status(400).json({ error: "Invalid email" });
    } else if (error.code === "auth/weak-password") {
      return response.status(400).json({ error: "Weak password" });
    } else {
      console.log(error);
      return response.status(500).json({
        error:
          "An error occurred while creating your account. Please try again.",
      });
    }
  }
};

module.exports = {
  createUser,
};

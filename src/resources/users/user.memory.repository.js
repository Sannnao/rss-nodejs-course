const User = require('./user.model');

const getUsersFromDB = async () => {
  try {
    const users = await User.find();

    return users.map((user) => User.toResponce(user));
  } catch (err) {
    throw new Error(err);
  }
};

const getUserFromDB = async (userId) => {
  try {
    const user = await User.findById(userId);

    return User.toResponce(user);
  } catch (err) {
    throw {
      status: 404,
      message: `User with id ${userId} doesn't exist!`,
      err,
    };
  }
};

const saveUserToDB = async (userData) => {
  try {
    const user = await User.create(userData);
    return User.toResponce(user);
  } catch (err) {
    throw new Error(err);
  }
};

const updateUserToDB = async (userId, userData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });

    return User.toResponce(updatedUser);
  } catch (err) {
    throw {
      status: 404,
      message: `User with id ${userId} doesn't exist!`,
      err,
    };
  }
};

const removeUserFromDB = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
  } catch (err) {
    throw {
      status: 404,
      message: `User with id ${userId} doesn't exist!`,
      err,
    };
  }
};

module.exports = {
  getUsersFromDB,
  getUserFromDB,
  saveUserToDB,
  updateUserToDB,
  removeUserFromDB,
};

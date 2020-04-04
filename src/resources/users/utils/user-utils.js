const User = require('../user.model');

const createUser = (userData) => new User(userData);
const excludePassword = (user) => User.toResponse(user);

module.exports = { createUser, excludePassword };

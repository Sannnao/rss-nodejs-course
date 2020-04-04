const uuid = require('uuid');

class User {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  getUser() {
    return {
      id: this.id,
      name: this.name,
      login: this.login,
      password: this.password,
    };
  }

  static excludePassword({ id, name, login }) {
    return { id, name, login };
  }
}

module.exports = User;

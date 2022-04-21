class Users {
  constructor() {
    // we use an in-memory "database"; this isn't persistent but is easy
    // default user
    this.users = { emery: 'compsci326' };
  }

  // Returns true iff the user exists.
  findUser(username) {
    if (!this.users[username]) {
      return false;
    } else {
      return true;
    }
  }

  // Returns true iff the password is the one we have stored (in plaintext = bad
  // but easy).
  validatePassword(name, pwd) {
    if (!this.findUser(name)) {
      return false;
    }
    if (this.users[name] !== pwd) {
      return false;
    }
    return true;
  }

  // Add a user to the "database".
  addUser(name, pwd) {
    if (this.findUser(name)) {
      return false;
    }
    this.users[name] = pwd;
    return true;
  }
}

export default new Users();

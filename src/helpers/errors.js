class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

class LoginError extends Error {
  constructor() {
    super();
    this.message = "Email or password is wrong";
    this.status = 401;
  }
}

class UnauthorizedError extends Error {
  constructor() {
    super();
    this.message = "Not authorized";
    this.status = 401;
  }
}

class EmailConflictError extends Error {
  constructor() {
    super();
    this.message = "Email in use";
    this.status = 409;
  }
}

module.exports = {
  AppError,
  UnauthorizedError,
  LoginError,
  EmailConflictError,
};

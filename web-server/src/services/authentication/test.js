const userManagement = require("./userManagement");

console.log(userManagement.getActiveUsers());

const payload = {
  email: "hello@gmail.com",
  refreshToken: "refreshToken.1",
  expiredTimeInMilliseconds: 123789123,
};

userManagement.addActiveUser(payload);

console.log(userManagement.getActiveUsers());

userManagement.addActiveUser(payload);

userManagement.addActiveUser(payload);

userManagement.addActiveUser(payload);

console.log(userManagement.getActiveUsers());

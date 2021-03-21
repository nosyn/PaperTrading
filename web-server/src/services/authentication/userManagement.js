const activeUser = (payload) => ({
  email: payload.email,
  refreshToken: payload.refreshToken,
  expiredTime: Date.now() + payload.expiredTimeInMilliseconds,
});

let activeUsers = new Array();

const userManagement = {
  getActiveUsers: () => activeUsers,
  addActiveUser: (payload) => {
    activeUsers.push(activeUser(payload));
  },
};

module.exports = userManagement;

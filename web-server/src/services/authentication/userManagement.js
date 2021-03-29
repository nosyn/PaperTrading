const activeUser = (payload) => ({
  email: payload.email,
  refreshToken: payload.refreshToken,
  expiredTime: Date.now() + payload.expiredTimeInMilliseconds,
});

const activeUsers = [];

const userManagement = {
  getActiveUsers: () => activeUsers,
  addActiveUser: (payload) => {
    activeUsers.push(activeUser(payload));
  },
};

module.exports = userManagement;

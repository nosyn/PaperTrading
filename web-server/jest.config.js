// More info: https://jestjs.io/docs/en/configuration

module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["js", "jsx"],
  modulePaths: ["./src"],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
};

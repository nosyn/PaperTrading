const configs = require("./configs");

describe("configs", () => {
  it("exists", () => {
    expect(configs).toBeDefined();
  });

  const { serverConfigs } = configs;

  describe("serverConfig", () => {
    it("exists", () => {
      expect(serverConfigs).toBeDefined();
    });
    it("PORT values is 5000", () => {
      expect(serverConfigs.PORT).toEqual(5000);
    });

    //https://stackoverflow.com/questions/48033841/test-process-env-with-jest
    it.todo("PORT values is 1234 if process.env.PORT = 1234");
  });
});

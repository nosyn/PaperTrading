import { apolloClientConfigs } from "./configs";
import { waitFor } from "@testing-library/react";

describe("configs", () => {
  describe("apolloClientConfigs", () => {
    it("apolloClientConfigs exists", () => {
      expect(apolloClientConfigs).toBeDefined();
    });
    it("Apollo Client uri is /graphql", () => {
      expect(apolloClientConfigs.uri).toMatch(/graphql/i);
    });
  });
});

import { render, screen } from "@testing-library/react";
import App from "./App";
import { MockedProvider } from "@apollo/client/testing";
import { mount } from "enzyme";

describe("App", () => {
  it("exists", () => {
    expect(App).toBeDefined();
  });

  const fullWrapper = (opts = {}) => {
    return mount(
      <MockedProvider>
        <App />
      </MockedProvider>
    );
  };
});

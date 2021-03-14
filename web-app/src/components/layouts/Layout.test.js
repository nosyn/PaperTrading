import React from "react";

import { mount } from "enzyme";

// Components
import Layout from "./Layout";
import Themer from "../Themer";
import Navbar from "../navbars/Navbar";

const ChildComponent = () => <div>Child</div>;

describe("the Layout component", () => {
  it("exists", () => {
    expect(Layout).toBeDefined();
  });

  const fullWrapper = (options = {}) => {
    const { props = {} } = options;

    const wrapper = mount(
      <Themer>
        <Layout {...props}>
          <ChildComponent />
        </Layout>
      </Themer>
    );

    return wrapper;
  };

  describe("the rendered components", () => {
    describe("with no props", () => {
      const wrapper = fullWrapper();
      it("renders a Navbar", () => {
        expect(wrapper.find(Navbar)).toHaveLength(1);
      });
      it("renders a main content", () => {
        expect(wrapper.find(ChildComponent)).toHaveLength(1);
      });
    });

    describe("with noNavbar", () => {
      const props = { noNavbar: true };
      const wrapper = fullWrapper({ props });
      it("doesn't render a Navbar", () => {
        expect(wrapper.find(Navbar)).toHaveLength(0);
      });
    });
  });
});

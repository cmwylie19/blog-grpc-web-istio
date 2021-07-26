import React from "react";
import { shallow } from "enzyme";
import Theme, { darkTheme } from "./Theme";

describe("ThemeContainer", () => {
  let wrapper = shallow(
    <Theme theme={darkTheme}>
      <div id="child">child</div>
    </Theme>
  );
  it("mounts", () => {
    expect(wrapper).toBeDefined();
  });

  it("matches snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
